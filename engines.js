// Storage keys
const STORAGE_KEYS = {
  lastQuery: 'lastQuery',
  selectedEngines: 'selectedEngines',
  theme: 'theme',
  groupTabs: 'groupTabs'
};

// Search engine configurations
const SEARCH_ENGINES = {
  google: {
    name: 'Google',
    url: 'https://www.google.com/search?q={query}'
  },
  bing: {
    name: 'Bing',
    url: 'https://www.bing.com/search?q={query}'
  },
  duckduckgo: {
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q={query}'
  },
  brave: {
    name: 'Brave',
    url: 'https://search.brave.com/search?q={query}'
  },
  startpage: {
    name: 'Startpage',
    url: 'https://www.startpage.com/sp/search?q={query}'
  },
  qwant: {
    name: 'Qwant',
    url: 'https://www.qwant.com/?q={query}'
  },
  mojeek: {
    name: 'Mojeek',
    url: 'https://www.mojeek.com/search?q={query}'
  },
  presearch: {
    name: 'Presearch',
    url: 'https://presearch.com/search?q={query}'
  },
  kagi: {
    name: 'Kagi',
    url: 'https://kagi.com/search?q={query}'
  },
  // Academic & Research
  google_scholar: {
    name: 'Google Scholar',
    url: 'https://scholar.google.com/scholar?q={query}'
  },
  arxiv: {
    name: 'arXiv',
    url: 'https://arxiv.org/search/?query={query}&searchtype=all'
  },
  semantic_scholar: {
    name: 'Semantic Scholar',
    url: 'https://www.semanticscholar.org/search?q={query}'
  },
  scihub: {
    name: 'Sci-Hub',
    url: 'https://sci-hub.se/{query}'
  },
  libgen: {
    name: 'LibGen',
    url: 'https://libgen.li/index.php?req={query}'
  },
  // SearXNG instances (top diverse nodes from searx.space)
  searxng_paulgo: {
    name: 'SearXNG (PaulGo)',
    url: 'https://paulgo.io/search?q={query}'
  },
  searxng_tiekoetter: {
    name: 'SearXNG (Tiekotter)',
    url: 'https://searx.tiekoetter.com/search?q={query}'
  },
  searxng_linxx: {
    name: 'SearXNG (Linxx)',
    url: 'https://searx.linxx.net/search?q={query}'
  },
  searxng_priv: {
    name: 'SearXNG (Priv AU)',
    url: 'https://priv.au/search?q={query}'
  },
  searxng_pereira: {
    name: 'SearXNG (Iceland)',
    url: 'https://search.pereira.is/search?q={query}'
  },
  yandex: {
    name: 'Yandex',
    url: 'https://yandex.com/search/?text={query}'
  },
  yandex_alt: {
    name: 'Yandex (Alt)',
    url: 'https://ya.ru/search/?text={query}'
  },
  you: {
    name: 'You.com',
    url: 'https://you.com/search?q={query}'
  },
  yep: {
    name: 'Yep',
    url: 'https://yep.com/web?q={query}'
  },
  lilo: {
    name: 'Lilo',
    url: 'https://search.lilo.org/?q={query}'
  },
  reddit: {
    name: 'Reddit',
    url: 'https://www.reddit.com/search/?q={query}'
  },
  github: {
    name: 'GitHub',
    url: 'https://github.com/search?q={query}'
  },
  rutracker: {
    name: 'Rutracker',
    url: 'https://rutracker.org/forum/tracker.php?nm={query}'
  },
  annas_archive: {
    name: "Anna's Archive",
    url: 'https://annas-archive.org/search?q={query}'
  },
  btdigg: {
    name: 'BTDigg',
    url: 'https://btdig.com/search?order=0&q={query}'
  }
};
