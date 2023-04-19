import React, { useEffect } from 'react';

const TickerTape = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.id = 'ticker-tape-script';
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: 'FOREXCOM:SPXUSD',
          title: 'S&P 500',
        },
        {
          proName: 'FOREXCOM:NSXUSD',
          title: 'Nasdaq 100',
        },
        {
          proName: 'FX_IDC:EURUSD',
          title: 'EUR/USD',
        },
        {
          description: 'Bitcoin / USD',
          proName: 'BITSTAMP:BTCUSD',
        },
        {
          description: 'Ethereum / USD',
          proName: 'BITSTAMP:ETHUSD',
        },
      ],
      showSymbolLogo: true,
      theme: 'dark',
      isTransparent: false,
      locale: 'en',
    });

    const container = document.getElementById('ticker-tape-container');
    const oldScript = document.getElementById('ticker-tape-script');

    if (container && !oldScript) {
      container.appendChild(script);
    }
  }, []);

  return <div className="w-full" id="ticker-tape-container" />;
};

export default TickerTape;
