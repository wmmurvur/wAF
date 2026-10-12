<?php
// The early-access form of /pricing/ (#early) posts here. Hostinger runs PHP next to the static site, so the list needs
// no outside service: each sign-up is one line of a CSV kept outside the web folder, and a note goes to the owner.
//
// The CSV: ../agentfarm-private/early-access.csv, beside public_html, where no browser can reach it. If the host does
// not let us make that folder, .private/ in this folder, closed to the web by its own .htaccess.
// Columns: time (UTC), email, plan, use, consent (the wording's date), so a removal request or a consent question can
// be answered from the file. Nothing else is kept: no IP address, no browser, no cookie.
//
// NOTIFY_TO: where the note about a new sign-up goes. Empty sends nothing; the list fills all the same.

const NOTIFY_TO = '';
const NOTIFY_FROM = 'noreply@agentfarm.space';
const CONSENT = 'privacy policy 2026-10-12';
const PLANS = ['pro', 'fleet', 'farm', 'unsure'];
const USES = ['', 'code', 'video', 'writing', 'team', 'other'];
const MIN_SECONDS = 3;                // a person takes longer than this to fill the form
const MAX_BYTES = 5 * 1024 * 1024;    // a list this long means something is wrong

$json = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

function answer($code, $body) {
  global $json;
  http_response_code($code);
  if ($json) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($body);
  } else {
    header('Content-Type: text/html; charset=utf-8');
    $msg = $body['ok'] ? 'Thank you. We will write once, when paid plans open.' : htmlspecialchars($body['error']);
    echo "<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width'><meta name=robots content=noindex>"
      . "<title>Early access · Agent Farm</title><body style='background:#090a07;color:#eeefe6;font:17px/1.6 system-ui,sans-serif;padding:12vh 24px;max-width:560px;margin:auto'>"
      . "<p>$msg</p><p><a style='color:#a8f035' href='pricing/'>Back to Agent Farm</a></p>";
  }
  exit;
}
$fail = fn($code, $error) => answer($code, ['ok' => false, 'error' => $error]);

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { header('Allow: POST'); $fail(405, 'This address only takes the early-access form.'); }

// a bot fills every field it sees, and fills it at once: answer it as if it worked, and keep nothing
$t = (int)($_POST['t'] ?? 0);
if (($_POST['website'] ?? '') !== '' || ($t > 0 && time() * 1000 - $t < MIN_SECONDS * 1000)) answer(200, ['ok' => true, 'again' => false]);

$email = trim((string)($_POST['email'] ?? ''));
$plan = (string)($_POST['plan'] ?? 'unsure');
$use = (string)($_POST['use'] ?? '');
if (strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) $fail(422, 'That email address does not look right.');
if (!in_array($plan, PLANS, true)) $plan = 'unsure';
if (!in_array($use, USES, true)) $use = '';
if (($_POST['consent'] ?? '') !== '1') $fail(422, 'Tick the box, so we may write to you.');

// where the list lives
$dir = dirname(__DIR__) . '/agentfarm-private';
if (!is_dir($dir) && !@mkdir($dir, 0700, true)) {
  $dir = __DIR__ . '/.private';
  if (!is_dir($dir) && !@mkdir($dir, 0700, true)) $fail(500, 'Something went wrong on our side. Please try again later.');
  @file_put_contents("$dir/.htaccess", "Require all denied\nDeny from all\n");
}
$file = "$dir/early-access.csv";
if (is_file($file) && filesize($file) > MAX_BYTES) $fail(503, 'The list is closed for now. Please try again later.');

$fh = @fopen($file, 'c+');
if (!$fh || !flock($fh, LOCK_EX)) $fail(500, 'Something went wrong on our side. Please try again later.');

// one line per address: a second sign-up with the same address changes nothing
$key = strtolower($email);
$again = false;
rewind($fh);
while (($row = fgetcsv($fh, 0, ',', '"', '')) !== false) {
  if (isset($row[1]) && strtolower(ltrim($row[1], "'")) === $key) { $again = true; break; }
}
if (!$again) {
  fseek($fh, 0, SEEK_END);
  if (ftell($fh) === 0) fputcsv($fh, ['time', 'email', 'plan', 'use', 'consent'], ',', '"', '');
  // a spreadsheet must not read an address as a formula
  $safe = preg_match('/^[=+\-@]/', $email) ? "'$email" : $email;
  fputcsv($fh, [gmdate('Y-m-d\TH:i:s\Z'), $safe, $plan, $use, CONSENT], ',', '"', '');
  fflush($fh);
}
flock($fh, LOCK_UN);
fclose($fh);

if (!$again && NOTIFY_TO !== '') {
  @mail(NOTIFY_TO, "Agent Farm early access: $plan", "A new early-access sign-up.\n\nEmail: $email\nPlan: $plan\nMostly for: " . ($use ?: '-') . "\n",
    'From: Agent Farm <' . NOTIFY_FROM . ">\r\nContent-Type: text/plain; charset=utf-8");
}

answer(200, ['ok' => true, 'again' => $again]);
