# agentfarm.space · bitmiş site

Bu dal sitenin **bitmiş hali**: Hostinger'a olduğu gibi yüklenecek dosyalar. Sürüm 0.13.6, `source` dalındaki abf25a7 commit'inden üretildi.

```
index.html        ana sayfa
features/         ana sayfanın arkasındaki sayfalar (her sayfa kendi klasöründe)
pricing/          fiyatlar ve erken kayıt formu
terms/ privacy/ refunds/   koşullar, gizlilik, iade
early-access.php  erken kayıt formunu Hostinger'da kaydeden dosya
favicon.svg     tarayıcı sekmesindeki simge
robots.txt      arama motorları için
assets/         stiller (site.css), scriptler, fontlar, sesler
```

## Bilgisayarında açmak

1. Bu sayfada yeşil **Code** düğmesine bas, **Download ZIP**'i seç.
2. İnen ZIP'i aç.
3. Klasördeki `index.html` dosyasına çift tıkla. Site tarayıcıda açılır; internet gerekmez.

## Hostinger'a yüklemek

İki yoldan biri yeterli.

**Elle yükleme:** hPanel'de Dosya Yöneticisi'ni (File Manager) aç, `public_html` klasörüne gir ve `README.md` dışındaki her şeyi, klasörleriyle birlikte yükle: şu an `index.html`, `early-access.php`, `favicon.svg`, `robots.txt`, `assets`, `features`, `pricing`, `terms`, `privacy` ve `refunds`. Yeni sayfalar geldikçe yeni klasörler de eklenir; hepsi yüklenmeli.

**Git ile:** hPanel'deki Git bölümünde depo adresi olarak `https://github.com/wmmurvur/wAF.git`, dal olarak `main` gir ve kurulum klasörü (directory) alanını boş bırak; dosyalar doğrudan `public_html`'e gelir. Bunun için `public_html`'in boş olması gerekir. Sonraki güncellemeler Deploy düğmesiyle tek tıkla gelir.

## Erken kayıt listesi

Fiyat sayfasındaki form `early-access.php`'ye gider. Her kayıt bir satır olarak `public_html`'in yanındaki `agentfarm-private/early-access.csv` dosyasına yazılır (tarayıcıdan ulaşılamaz). hPanel'in Dosya Yöneticisi'nde `public_html`'in bir üst klasörüne çıkınca görünür; Excel ya da Google Sheets ile açılır. Hosting o klasörü açmaya izin vermezse liste `public_html/.private/` içinde, web'e kapalı olarak tutulur.

## Değişiklik

Bu dalı elle değiştirme: her güncellemede baştan üretilir ve elle yapılan değişiklik kaybolur. Sitenin kodu `source` dalında.
