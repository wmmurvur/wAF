# agentfarm.space · bitmiş site

Bu dal sitenin **bitmiş hali**: Hostinger'a olduğu gibi yüklenecek dosyalar. Sürüm 0.7.0, `source` dalındaki f3b82b1 commit'inden üretildi.

```
index.html      ana sayfa
features/       ana sayfanın arkasındaki sayfalar (her sayfa kendi klasöründe)
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

**Elle yükleme:** hPanel'de Dosya Yöneticisi'ni (File Manager) aç, `public_html` klasörüne gir ve `README.md` dışındaki her şeyi, klasörleriyle birlikte yükle: şu an `index.html`, `favicon.svg`, `robots.txt`, `assets` ve `features`. Yeni sayfalar geldikçe yeni klasörler de eklenir; hepsi yüklenmeli.

**Git ile:** hPanel'deki Git bölümünde depo adresi olarak `https://github.com/katehuyen/web_AgentFarm.git`, dal olarak `main` gir ve kurulum klasörü (directory) alanını boş bırak; dosyalar doğrudan `public_html`'e gelir. Bunun için `public_html`'in boş olması gerekir. Sonraki güncellemeler Deploy düğmesiyle tek tıkla gelir.

## Değişiklik

Bu dalı elle değiştirme: her güncellemede baştan üretilir ve elle yapılan değişiklik kaybolur. Sitenin kodu `source` dalında.
