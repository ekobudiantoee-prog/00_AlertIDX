// ====================================================
// KONFIGURASI AUTHENTICATION & ID TELEGRAM
// ====================================================
const TELEGRAM_TOKEN   = "8765725366:AAEtZNT9NNlHp0IMeuV4qJHgEXx-jHPRBx4";
const TELEGRAM_CHAT_ID = "-1004477079290"; // Contoh: "-100123456789" (Grup) atau "12345678" (Personal)

// Daftar kata kunci positif pembawa sentimen bullish
const POSITIVE_KEYWORDS = [
  // Kinerja Keuangan & Dividen
  "dividen", "interim", "cum date", "yield", "payout ratio", "cum dividen",
  "laba", "laba bersih", "pendapatan", "omset", "penjualan", "rekor", 
  "tumbuh", "melonjak", "meroket", "turnaround", "surplus", "rekor pendapatan",
  "berbalik laba",

  // Aksi Korporasi & Ekspansi
  "akuisisi", "akusisi", "mengakuisisi", "merger", "ekspansi", "kerjasama", "kerja sama", "joint venture",
  "kemitraan", "kontrak", "tender", "pemenang tender", "proyek", "pabrik baru",
  "kapasitas", "komersial", "buyback", "pembelian kembali saham", "rights issue", 
  "suntikan modal", "stock split", "pemecahan saham", "bonus saham", "saham bonus",
  "tender offer", "penawaran tender", "pengambilalihan", "mengambil alih", "mou", "penambahan kapasitas",

  // Sentimen Pasar & Analisis
  "top gainers", "top gainer", "akumulasi", "lonjakan", "volume", "rebound", 
  "breakout", "rally", "bullish", "uptrend", "target harga", "overweight",

  // Restrukturisasi, Investor & Efisiensi
  "efisiensi", "marjin", "margin", "strategi", "fokus bisnis", "restrukturisasi",
  "private placement", "investor strategis", "masuknya investor", "restrukturisasi utang",
  "pelunasan obligasi", "penyertaan modal"
];

// Daftar kata umum 4 huruf kapital yang BUKAN ticker saham (Exclusion List)
const EXCLUDED_WORDS = new Set([
  "IHSG", "BEI", "IDX", "OJK", "APBN", "BUMN", "BUMD", "ROAE", "ROA", "ROE",
  "EBIT", "EPS", "PER", "PBV", "DER", "CAGR", "NPL", "NPM", "GPM", "OPM",
  "FED", "BI", "US", "USD", "IDR", "EUR", "SGD", "JPY", "CNY", "HKD",
  "NEWS", "INFO", "LIVE", "UPDATE", "BEST", "HIGH", "LOW", "GAIN", "LOSS",
  "FREE", "PLUS", "PRO", "CORP", "INCO", "AUTO", "TECH", "GOLD", "COAL",
  "ASIA", "JAWA", "BALI", "IOTA", "SURA", "KOTA", "BANK", "OJEK", "TAXI"
]);

// Daftar Ticker Fallback (dipakai jika API IDX gagal diakses)
// CATATAN: List ini di-update terakhir Oktober 2026. Untuk ticker terbaru,
// fungsi getActiveTickerSet() otomatis fetch dari API IDX dan cache hasilnya.
const IDX_TICKERS_FALLBACK = new Set([
  "AADI", "AALI", "ABBA", "ABDA", "ABMM", "ACES", "ACST", "ACTD", "ADCP", "ADES", "ADHI",
  "ADMF", "ADMG", "ADMR", "ADRO", "AGAR", "AGII", "AGRO", "AGRS", "AHAP", "AIMS",
  "AISA", "AKRA", "AKSI", "ALDO", "ALKA", "ALMI", "AMAG", "AMAR", "AMFG", "AMIN",
  "AMMN", "AMOR", "AMRT", "ANDI", "ANJT", "ANTM", "APEX", "APIC", "APLI", "APLN",
  "ARCI", "ARGO", "ARII", "ARKA", "ARNA", "ARTA", "ARTI", "ARTO", "ASBI", "ASDM",
  "ASGR", "ASII", "ASJT", "ASLC", "ASMI", "ASPI", "ASRI", "ASRM", "ATIC", "AUTO",
  "AVIA",
  "BABP", "BACA", "BACH", "BAJA", "BALI", "BAPA", "BAPI", "BATA", "BBCA", "BBHI", "BBKP",
  "BBLD", "BBMD", "BBNI", "BBRI", "BBRM", "BBTN", "BBYB", "BCAP", "BCIC", "BCIP",
  "BDMN", "BEBS", "BEEF", "BEST", "BFIN", "BGTG", "BHAT", "BHIT", "BIKE", "BIKA", "BIMA",
  "BINA", "BIPI", "BIRD", "BIRT", "BISC", "BITC", "BJBR", "BJTM", "BKDP", "BKSL",
  "BKSW", "BLTZ", "BLUE", "BMAS", "BMBL", "BMHS", "BMRI", "BMTR", "BNBA", "BNBR",
  "BNGA", "BNII", "BNLI", "BOBA", "BPII", "BPTR", "BREN", "BRIS", "BRMS", "BRPT",
  "BSDE", "BSIM", "BSWD", "BTEK", "BTEL", "BTPN", "BTPS", "BUKA", "BUKK", "BULL",
  "BUMI", "BVIC", "BWPT", "BYAN", "CAKK", "CAMP", "CASS", "CASH", "CAST", "CEKA",
  "CENT", "CFIN", "CINT", "CITA", "CITY", "CLPI", "CMNP", "CMPP", "CMRY", "CNTX",
  "COWL", "CPIN", "CPRI", "CPRO", "CRIS", "CSAP", "CSIS", "CSRA", "CTBN", "CTRA", "CTRP",
  "CTTH", "DART", "DEAL", "DEFI", "DEWA", "DEXA", "DFAM", "DGGH", "DILD", "DIVA",
  "DKFT", "DLTA", "DMAS", "DNAR", "DNET", "DOID", "DPNS", "DSFI", "DSNG", "DSSA",
  "DUCK", "DVLA", "DWGL", "EAST", "ECII", "ELSA", "EMMI", "ENRG", "ENVY", "ERAA", "ERTX", "ESSA",
  "ESTI", "ETWA", "EXCL", "FAST", "FASW", "FILE", "FILM", "FPNI", "FNTX", "FORU",
  "FREN", "GGRM", "GIAA", "GJTL", "GLOB", "GLVA", "GMCW", "GMPS", "GNDR",
  "GOLD", "GOTO", "GPRA", "GSMF", "GTSN", "HDFA", "HDTX", "HERO", "HEXA", "HITS",
  "HMSP", "HOKI", "HOME", "HOPE", "HORI", "HRTA", "HRUM", "IATA", "IBFN", "IBST",
  "ICBP", "ICON", "IDPR", "IGAR", "IIKP", "IKAI", "IKBI", "IMJS", "IMPC", "INAF",
  "INCF", "INCI", "INCO", "INDF", "INDS", "INDY", "INKP", "INPC", "INPP", "INRU", "INTD",
  "INTP", "IPCC", "IPCM", "IPOL", "IPPE", "IPTV", "IRRA", "ISAT", "ISSP", "ITMG",
  "ITIC", "ITMA", "JARR", "JAST", "JECX", "JECC", "JELI", "JKSW", "JPFA", "JRPT", "JSMR", "JSPT",
  "JTPE", "KAEF", "KARW", "KASW", "KBAG", "KBLI", "KBLM", "KBLV", "KBRI", "KDSI",
  "KIAS", "KICI", "KIJA", "KKGI", "KLBF", "KMDR", "KMTR", "KOBX", "KOIN", "KOCI",
  "KOPI", "KPAL", "KPIG", "KRAS", "KREN", "LPCK", "LPGI", "LPLI", "LPPF", "LPPS",
  "LRMT", "LSIP", "LTLS", "LUXI", "MAPA", "MAPI", "MARI", "MASA", "MBAP", "MBSS",
  "MCOR", "MCAS", "MDKA", "MDKI", "MDLN", "MDRN", "MEDC", "MEGA", "METR", "MFIN",
  "MFMI", "MGNA", "MGRO", "MICE", "MIDI", "MIKA", "MINA", "MIRA", "MITI", "MKPI",
  "MLBI", "MLIA", "MLPL", "MMIX", "MNCN", "MPOW", "MPPA", "MPMX", "MRAT", "MREI",
  "MSIN", "MSKY", "MTEL", "MTDL", "MTFN", "MTLA", "MTPS", "MYOR", "MYTX", "NELY", "NIKL",
  "NIRO", "NISP", "NOBU", "NRCA", "OASA", "OKAS", "OMRE", "PALM", "PAMG",
  "PANS", "PBID", "PBSA", "PCAR", "PDES", "PEGE", "PGAS", "PGLI", "PGJO", "PJAA",
  "PKPK", "PLIN", "PLAS", "PNBN", "PNBS", "PNIN", "PNLF", "POLA", "POLI", "POLL",
  "POLU", "POLY", "POOL", "POSA", "POWR", "PPGL", "PPRE", "PPRO", "PRDA", "PRDL", "PRIM",
  "PTBA", "PTIS", "PTPP", "PTSN", "PTSP", "PUDP", "PWON", "PYFA", "RAJA", "RALS",
  "RANC", "RANS", "RBMS", "RDTX", "RELI", "RICY", "RIGS", "RISE", "RMKE", "RODA", "ROTI",
  "RUIS", "SAFE", "SAME", "SAMF", "SAPX", "SCCO", "SCMA", "SCNP", "SDRA", "SEMA",
  "SFAN", "SGER", "SGMR", "SHID", "SIIP", "SILO", "SIMP", "SIPD", "SKBM", "SKLT", "SMBR",
  "SMCB", "SMDR", "SMGR", "SMKL", "SMMA", "SMMT", "SMRA", "SMSM", "SOCI", "SONA",
  "SOSS", "SPSJ", "SPTO", "SQMI", "SRET", "SRIL", "SRTG", "SSIA", "SSMS", "SSTR",
  "STAA", "STAT", "STTP", "SUDI", "SUMI", "SUNU", "SUPR", "TALF", "TPIA", "TARA",
  "TAXI", "TBIG", "TBLA", "TBMS", "TCID", "TCPI", "TDPM", "TEBE", "TECH", "TELE",
  "TFCO", "TGKA", "TIFA", "TIMK", "TINS", "TIRA", "TISC", "TKIM", "TLKM", "TMAS",
  "TMPO", "TNCA", "TOBA", "TOWR", "TOPS", "TOTO", "TPIA", "TPMA", "TREG",
  "TRIL", "TRIN", "TRIS", "TRJA", "TRST", "TRUE", "TSPC", "TULT", "TIRT", "TYON",
  "ULTJ", "UNIC", "UNIQ", "UNTR", "UNVR", "URBN", "UVCR", "VICI", "VICO",
  "VINS", "VRNA", "WAPO", "WBSA", "WEGE", "WEHA", "WGSH", "WICR", "WIFI", "WIIM", "WIMP", "WINS",
  "WIRG", "WMUU", "WOOD", "WOWS", "WSBP", "WSKT", "WTON", "YPAS", "YULE", "ZBRA", "ZINC"
]);

/**
 * Ambil daftar ticker aktif dari IDX API, dengan cache di Script Properties (refresh 1x/hari).
 * Jika API gagal, fallback ke IDX_TICKERS_FALLBACK.
 */
function getActiveTickerSet() {
  const props = PropertiesService.getScriptProperties();
  const cacheKey = "IDX_TICKER_CACHE";
  const cacheTimestampKey = "IDX_TICKER_CACHE_TS";
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  // Cek cache: valid selama 1 hari
  const cachedTs = props.getProperty(cacheTimestampKey);
  const cachedData = props.getProperty(cacheKey);
  if (cachedTs && cachedData && (Date.now() - Number(cachedTs)) < ONE_DAY_MS) {
    try {
      const arr = JSON.parse(cachedData);
      if (arr.length > 100) {
        return new Set(arr);
      }
    } catch (e) { /* cache corrupt, refresh */ }
  }

  // Fetch dari IDX API: GetCompanyProfiles (semua emiten terdaftar)
  try {
    const apiUrl = "https://www.idx.co.id/primary/ListedCompany/GetCompanyProfiles?start=0&length=9999";
    const response = UrlFetchApp.fetch(apiUrl, {
      muteHttpExceptions: true,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://www.idx.co.id/id/perusahaan-tercatat/profil-perusahaan-tercatat/",
        "Accept": "application/json, text/plain, */*"
      }
    });

    if (response.getResponseCode() === 200) {
      const data = JSON.parse(response.getContentText());
      const companies = data.data || data.Data || [];
      
      if (companies.length > 100) {
        const tickers = companies
          .map(c => (c.KodeEmiten || c.kodeEmiten || "").trim())
          .filter(t => t.length >= 3 && t.length <= 5);
        
        // Simpan ke cache
        props.setProperty(cacheKey, JSON.stringify(tickers));
        props.setProperty(cacheTimestampKey, String(Date.now()));
        
        Logger.log("IDX Ticker Cache berhasil diperbarui: " + tickers.length + " emiten");
        return new Set(tickers);
      }
    }
  } catch (e) {
    Logger.log("Gagal fetch ticker dari IDX API (gunakan fallback): " + e.toString());
  }

  // Fallback ke hardcoded list
  return IDX_TICKERS_FALLBACK;
}

/**
 * Helper: Ekstraksi Ticker Saham dari Judul Berita
 * Menggunakan dynamic ticker set dari IDX API (dengan fallback ke hardcoded list)
 */
function extractTicker(title, tickerSet) {
  if (!title) return null;
  
  // Gunakan fallback jika tickerSet tidak disediakan
  if (!tickerSet) tickerSet = IDX_TICKERS_FALLBACK;

  // Regex mencari kata 3-5 huruf KAPITAL (ticker IDX bisa 3-5 huruf)
  const matches = title.match(/\b[A-Z]{3,5}\b/g);
  if (!matches) return null;

  const foundTickers = [];
  matches.forEach(word => {
    if (tickerSet.has(word) && !EXCLUDED_WORDS.has(word)) {
      if (!foundTickers.includes(word)) {
        foundTickers.push(word);
      }
    }
  });

  return foundTickers.length > 0 ? foundTickers.join(", ") : null;
}

/**
 * ====================================================
 * FUNGSI SETUP OTOMATIS
 * ====================================================
 */
function setupTrigger() {
  const allTriggers = ScriptApp.getProjectTriggers();
  allTriggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'checkAndSendPositiveNewsAlert') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('checkAndSendPositiveNewsAlert')
    .timeBased()
    .everyMinutes(15)
    .create();

  Logger.log("Trigger otomatis berhasil dibuat! Skrip akan berjalan setiap 15 menit.");
}

/**
 * ====================================================
 * FUNGSI UTAMA
 * ====================================================
 */
function checkAndSendPositiveNewsAlert() {
  const webSources = [
    { url: "https://www.idxchannel.com/market-news", name: "IDX Channel", baseUrl: "https://www.idxchannel.com" },
    { url: "https://www.cnbcindonesia.com/market", name: "CNBC Indonesia", baseUrl: "https://www.cnbcindonesia.com" },
    { url: "https://investasi.kontan.co.id/", name: "Kontan Investasi", baseUrl: "https://investasi.kontan.co.id" },
    { url: "https://finance.detik.com/bursa-dan-valas", name: "Detik Finance", baseUrl: "https://finance.detik.com" },
    { url: "https://www.idnfinancials.com/id/news", name: "IDN Financials", baseUrl: "https://www.idnfinancials.com" }
  ];
  
  // Multi-query RSS Google News agar mencakup emiten secara luas (akuisisi, dividen, laba, tender, dll.)
  // Termasuk feed khusus publikasi resmi keterbukaan informasi emiten
  const googleNewsRssUrls = [
    "https://news.google.com/rss/search?q=saham+IHSG+BEI&hl=id&gl=ID&ceid=ID:id",
    "https://news.google.com/rss/search?q=saham+(akuisisi+OR+dividen+OR+merger+OR+laba+OR+tender+OR+buyback)&hl=id&gl=ID&ceid=ID:id",
    "https://news.google.com/rss/search?q=emiten+(akuisisi+OR+ekspansi+OR+kontrak+OR+rights+issue)&hl=id&gl=ID&ceid=ID:id",
    "https://news.google.com/rss/search?q=(site:idnfinancials.com+OR+site:idxchannel.com)+akuisisi+OR+dividen+OR+merger+OR+laba&hl=id&gl=ID&ceid=ID:id"
  ];

  // Load daftar ticker aktif dari IDX API (cache 1 hari, fallback ke hardcoded list)
  const activeTickerSet = getActiveTickerSet();
  Logger.log("Jumlah ticker aktif: " + activeTickerSet.size);

  let allPositiveNews = [];

  // 1. Ambil & Scan dari Google News RSS (multi-query)
  googleNewsRssUrls.forEach(rssUrl => {
    try {
      const rssResponse = UrlFetchApp.fetch(rssUrl, { muteHttpExceptions: true });
      const rssNews = scanGoogleNewsRss(rssResponse.getContentText(), activeTickerSet);
      allPositiveNews = allPositiveNews.concat(rssNews);
    } catch (e) {
      Logger.log("Gagal mengambil Google News RSS (" + rssUrl + "): " + e.toString());
    }
  });

  // 2. Ambil & Scan dari API Keterbukaan Informasi BEI (IDX)
  try {
    const idxNews = fetchIDXAnnouncements(activeTickerSet);
    allPositiveNews = allPositiveNews.concat(idxNews);
  } catch (e) {
    Logger.log("Gagal mengambil Keterbukaan Informasi IDX: " + e.toString());
  }

  // 3. Ambil & Scan dari Web HTML masing-masing sumber berita lainnya
  webSources.forEach(source => {
    if (source.name !== "IDX Keterbukaan Informasi") { // Di-handle khusus via API BEI
      try {
        const response = UrlFetchApp.fetch(source.url, { muteHttpExceptions: true });
        const webNews = scanPositiveNews(response.getContentText(), source.name, source.baseUrl, activeTickerSet);
        allPositiveNews = allPositiveNews.concat(webNews);
      } catch (e) {
        Logger.log("Gagal mengambil data dari " + source.name + ": " + e.toString());
      }
    }
  });

  try {
    if (allPositiveNews.length === 0) {
      Logger.log("Tidak ada berita positif dengan Ticker Saham ditemukan.");
      return;
    }
    
    // 4. Ambil riwayat judul berita
    const scriptProperties = PropertiesService.getScriptProperties();
    const sentHistoryJson = scriptProperties.getProperty("SENT_NEWS_TITLES") || "[]";
    let sentHistory = JSON.parse(sentHistoryJson);
    
    // 5. Filter hanya berita baru
    const newPositiveNews = allPositiveNews.filter((item, index, self) =>
      !sentHistory.includes(item.title) &&
      index === self.findIndex((t) => t.title === item.title)
    );
    
    if (newPositiveNews.length === 0) {
      Logger.log("Tidak ada UPDATE berita positif baru. Pesan Telegram tidak dikirim.");
      return;
    }

    // 6. Urutkan berita dari yang terbaru (Descending)
    newPositiveNews.sort((a, b) => b.timestamp - a.timestamp);
    
    // 7. PECAH DAN KIRIM PESAN DALAM BATCH (Maksimal 10 berita per pesan)
    const BATCH_SIZE = 10;
    const totalBatches = Math.ceil(newPositiveNews.length / BATCH_SIZE);

    for (let b = 0; b < totalBatches; b++) {
      const batchNews = newPositiveNews.slice(b * BATCH_SIZE, (b + 1) * BATCH_SIZE);
      
      let message = `<b>🚨 ALERT UPDATE BERITA POSITIF SAHAM (${b + 1}/${totalBatches}) 🚨</b>\n`;
      message += "--------------------------------------\n\n";
      
      batchNews.forEach((item, index) => {
        const globalIndex = (b * BATCH_SIZE) + index + 1;
        message += `${globalIndex}. <b>${escapeHtml(item.title)}</b>\n`;
        message += `   📈 <b>Ticker:</b> ${escapeHtml(item.ticker)}\n`;
        message += `   📌 <b>Sumber:</b> ${escapeHtml(item.source)}\n`;
        message += `   📅 <b>Waktu:</b> ${escapeHtml(item.pubDate)}\n`;
        message += `   🔑 <b>Kata kunci:</b> ${escapeHtml(item.matchedKeyword)}\n`;
        if (item.link) {
          message += `   🔗 <a href="${item.link}">Baca Selengkapnya</a>\n`;
        }
        message += `\n`;
      });
      
      message += "<i>Pesan dikirim otomatis via Google Apps Script</i>";
      
      // Kirim pesan batch ke Telegram
      sendTelegramMessage(message);
      
      if (b < totalBatches - 1) {
        Utilities.sleep(1000);
      }
    }
    
    // 8. Simpan seluruh judul berita baru ke riwayat
    newPositiveNews.forEach(item => sentHistory.push(item.title));
    if (sentHistory.length > 100) {
      sentHistory = sentHistory.slice(sentHistory.length - 100);
    }
    
    scriptProperties.setProperty("SENT_NEWS_TITLES", JSON.stringify(sentHistory));
    Logger.log(`${newPositiveNews.length} berita baru berhasil dipecah menjadi ${totalBatches} pesan dan dikirim ke Telegram.`);
    
  } catch (error) {
    Logger.log("Error: " + error.toString());
  }
}

/**
 * Scanner Khusus Keterbukaan Informasi BEI (IDX API Endpoint)
 * 
 * Endpoint baru (sejak IDX migrasi ke Nuxt.js frontend):
 *   /primary/NewsAnnouncement/GetAllAnnouncement
 * 
 * Endpoint lama (DEPRECATED, return 403/404):
 *   /primary/News/GetAnnouncement
 * 
 * Referensi: https://github.com/nichsedge/idx-bei (API_VERIFICATION_SPEC.md, Agustus 2026)
 */
function fetchIDXAnnouncements(tickerSet) {
  const apiUrl = "https://www.idx.co.id/primary/NewsAnnouncement/GetAllAnnouncement?pageNumber=1&pageSize=50&lang=id";
  const results = [];
  const now = new Date();
  const currentDateStr = formatDisplayDate(now);

  try {
    const response = UrlFetchApp.fetch(apiUrl, {
      muteHttpExceptions: true,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://www.idx.co.id/id/perusahaan-tercatat/keterbukaan-informasi",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7"
      }
    });
    
    const statusCode = response.getResponseCode();
    Logger.log("IDX API Status Code: " + statusCode);

    if (statusCode === 200) {
      const data = JSON.parse(response.getContentText());
      
      // Struktur response baru: { ItemCount, PageCount, PageNumber, PageSize, Items: [...] }
      const items = data.Items || [];
      Logger.log("IDX API: Ditemukan " + items.length + " pengumuman");

      items.forEach(item => {
        // Field baru: Title, Code, PublishDate, Attachments
        const rawTitle = item.Title || "";
        const code = (item.Code || "").trim();
        const publishDate = item.PublishDate || "";
        
        let fullTitle = rawTitle;
        if (code && !rawTitle.includes(code)) {
          fullTitle = `[${code}] ${rawTitle}`;
        }

        if (fullTitle) {
          // 1. Cek Kata Kunci Positif
          const matchedKw = POSITIVE_KEYWORDS.find(kw => 
            fullTitle.toLowerCase().includes(kw.toLowerCase())
          );

          // 2. Cek Ticker (atau gunakan Code langsung jika terdaftar)
          const set = tickerSet || IDX_TICKERS_FALLBACK;
          let ticker = extractTicker(fullTitle, set) || (code && set.has(code) ? code : null);

          if (matchedKw && ticker) {
            // Parse tanggal dari PublishDate (format: "2026-08-07T17:11:21")
            let pubDateStr = currentDateStr;
            let timestamp = now.getTime();
            if (publishDate) {
              try {
                const pubDateObj = new Date(publishDate);
                pubDateStr = formatDisplayDate(pubDateObj);
                timestamp = pubDateObj.getTime();
              } catch (e) {
                // fallback ke waktu sekarang
              }
            }

            // Buat link ke PDF jika ada attachment
            let link = "https://www.idx.co.id/id/perusahaan-tercatat/keterbukaan-informasi";
            if (item.Attachments && item.Attachments.length > 0 && item.Attachments[0].FullSavePath) {
              link = item.Attachments[0].FullSavePath;
            }

            results.push({
              title: fullTitle,
              ticker: ticker,
              matchedKeyword: matchedKw,
              source: "IDX Keterbukaan Informasi",
              link: link,
              pubDate: pubDateStr,
              timestamp: timestamp
            });
          }
        }
      });
    } else {
      Logger.log("IDX API gagal dengan status: " + statusCode + " - " + response.getContentText().substring(0, 200));
    }
  } catch (e) {
    Logger.log("Error Fetching IDX API: " + e.toString());
  }

  return results;
}

/**
 * Scanner Khusus Google News RSS Feed (XML)
 */
function scanGoogleNewsRss(xmlText, tickerSet) {
  const results = [];
  if (!xmlText) return results;

  try {
    const document = XmlService.parse(xmlText);
    const root = document.getRootElement();
    const channel = root.getChild('channel');
    if (!channel) return results;

    const items = channel.getChildren('item');

    items.forEach(item => {
      const title = item.getChildText('title') || "";
      const rawPubDate = item.getChildText('pubDate') || "";
      const link = item.getChildText('link') || "";
      
      const sourceElement = item.getChild('source');
      const sourceName = sourceElement ? sourceElement.getText() : "Google News";

      if (title) {
        let cleanTitle = title.replace(/ - [^-]+$/, "").trim();

        // 1. Cek Kata Kunci Positif
        const matchedKw = POSITIVE_KEYWORDS.find(kw => 
          cleanTitle.toLowerCase().includes(kw.toLowerCase())
        );

        // 2. Cek Keberadaan Ticker Saham
        const ticker = extractTicker(cleanTitle, tickerSet);

        // Hanya masukkan jika memiliki KATA KUNCI POSITIF DAN TICKER SAHAM
        if (matchedKw && ticker && !results.some(r => r.title === cleanTitle)) {
          const pubDateObj = rawPubDate ? new Date(rawPubDate) : new Date();

          results.push({
            title: cleanTitle,
            ticker: ticker,
            matchedKeyword: matchedKw,
            source: sourceName,
            link: link,
            pubDate: formatDisplayDate(pubDateObj),
            timestamp: pubDateObj.getTime()
          });
        }
      }
    });
  } catch (e) {
    Logger.log("Error parsing RSS: " + e.toString());
  }
  return results;
}

/**
 * Scanner Fleksibel untuk HTML Web biasa
 */
function scanPositiveNews(html, sourceName, baseUrl, tickerSet) {
  const results = [];
  if (!html) return results;

  const regex = /<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
  let match;
  
  const now = new Date();
  const currentDateStr = formatDisplayDate(now);

  while ((match = regex.exec(html)) !== null && results.length < 25) {
    let rawUrl = match[1] || "";
    let rawTitle = match[2] || "";
    
    let cleanTitle = rawTitle
      .replace(/<[^>]+>/g, "")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&#039;/g, "'")
      .replace(/\s+/g, " ")
      .trim();
    
    if (cleanTitle.length > 15 && cleanTitle.length < 200) {
      // 1. Cek Kata Kunci Positif
      const matchedKw = POSITIVE_KEYWORDS.find(kw => 
        cleanTitle.toLowerCase().includes(kw.toLowerCase())
      );

      // 2. Cek Keberadaan Ticker Saham
      const ticker = extractTicker(cleanTitle, tickerSet);

      // Hanya masukkan jika memiliki KATA KUNCI POSITIF DAN TICKER SAHAM
      if (matchedKw && ticker && !results.some(item => item.title === cleanTitle)) {
        let fullUrl = rawUrl;
        if (rawUrl.startsWith("/")) {
          fullUrl = baseUrl + rawUrl;
        }

        results.push({
          title: cleanTitle,
          ticker: ticker,
          matchedKeyword: matchedKw,
          source: sourceName,
          link: fullUrl,
          pubDate: currentDateStr,
          timestamp: now.getTime()
        });
      }
    }
  }
  return results;
}

/**
 * Utility: Format Tanggal ke Format WIB
 */
function formatDisplayDate(dateInput) {
  if (!dateInput) {
    return Utilities.formatDate(new Date(), "Asia/Jakarta", "dd MMM yyyy, HH:mm 'WIB'");
  }
  try {
    const d = (dateInput instanceof Date) ? dateInput : new Date(dateInput);
    return Utilities.formatDate(d, "Asia/Jakarta", "dd MMM yyyy, HH:mm 'WIB'");
  } catch (e) {
    return dateInput.toString();
  }
}

/**
 * Fungsi Pengiriman Telegram Bot API
 */
function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  const payload = {
    'chat_id': TELEGRAM_CHAT_ID,
    'text': message,
    'parse_mode': 'HTML',
    'disable_web_page_preview': true
  };

  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true
  };

  try {
    const res = UrlFetchApp.fetch(url, options);
    Logger.log("Response Telegram: " + res.getContentText());
  } catch (e) {
    Logger.log("Error Telegram: " + e.toString());
  }
}

/**
 * Helper: Sanitasi karakter khusus agar tidak merusak tag HTML Telegram
 */
function escapeHtml(text) {
  if (!text) return "";
  return text.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * OPTIONAL: Reset riwayat pengiriman
 */
function resetNewsHistory() {
  PropertiesService.getScriptProperties().deleteProperty("SENT_NEWS_TITLES");
  Logger.log("Riwayat berita berhasil dihapus.");
}

/**
 * ====================================================
 * FUNGSI TESTING / DEBUGGING
 * ====================================================
 */

/**
 * Test 1: Verifikasi Koneksi Bot Telegram
 * Jalankan fungsi ini untuk memastikan Bot Token dan Chat ID valid.
 */
function testKirimPesanTelegram() {
  const pesanTest = `<b>🤖 TEST BOT TELEGRAM IDX ALERT 🤖</b>\n\n` +
                    `✅ Koneksi bot berhasil!\n` +
                    `📅 Waktu: ${formatDisplayDate(new Date())}\n` +
                    `📌 Status: Bot aktif dan siap memantau berita positif saham.`;
  sendTelegramMessage(pesanTest);
}

/**
 * Test 2: Simulasi Deteksi Berita BIKE (Verifikasi Parser & Ticker)
 * Jalankan fungsi ini untuk membuktikan ticker BIKE dan kata kunci lolos filter.
 */
function testSimulasiBeritaBIKE() {
  const activeTickerSet = getActiveTickerSet();
  
  const sampleTitle = "Sepeda Bersama Indonesia (BIKE) Akuisisi Perusahaan Logistik untuk Perluas Bisnis";
  const sampleLink  = "https://www.idx.co.id/id/perusahaan-tercatat/keterbukaan-informasi";
  const matchedKw   = POSITIVE_KEYWORDS.find(kw => sampleTitle.toLowerCase().includes(kw.toLowerCase()));
  const ticker      = extractTicker(sampleTitle, activeTickerSet);
  
  Logger.log(`Hasil Test -> Ticker: ${ticker} | Keyword: ${matchedKw}`);

  if (matchedKw && ticker) {
    let message = `<b>🚨 ALERT UPDATE BERITA POSITIF SAHAM (TEST) 🚨</b>\n` +
                  `--------------------------------------\n\n` +
                  `1. <b>${escapeHtml(sampleTitle)}</b>\n` +
                  `   📈 <b>Ticker:</b> ${escapeHtml(ticker)}\n` +
                  `   📌 <b>Sumber:</b> IDX Keterbukaan Informasi (Simulasi)\n` +
                  `   📅 <b>Waktu:</b> ${formatDisplayDate(new Date())}\n` +
                  `   🔑 <b>Kata kunci:</b> ${escapeHtml(matchedKw)}\n`;

    if (sampleLink) {
      message += `   🔗 <a href="${sampleLink}">Baca Selengkapnya</a>\n`;
    }

    message += `\n<i>Pesan test verifikasi filter BIKE berhasil!</i>`;

    sendTelegramMessage(message);
    Logger.log("Pesan test simulasi BIKE berhasil dikirim ke Telegram.");
  } else {
    Logger.log("Gagal! Ticker atau kata kunci tidak cocok.");
  }
}