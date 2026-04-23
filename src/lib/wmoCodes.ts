const WMO_CODES: Record<
  number,
  {
    day: { description: string; image: string };
    night: { description: string; image: string };
  }
> = {
  0: {
    day: {
      description: "Trời nắng",
      image: "http://openweathermap.org/img/wn/01d@2x.png",
    },
    night: {
      description: "Quang đãng",
      image: "http://openweathermap.org/img/wn/01n@2x.png",
    },
  },
  1: {
    day: {
      description: "Trời nắng",
      image: "http://openweathermap.org/img/wn/01d@2x.png",
    },
    night: {
      description: "Quang đãng",
      image: "http://openweathermap.org/img/wn/01n@2x.png",
    },
  },
  2: {
    day: {
      description: "Có mây",
      image: "http://openweathermap.org/img/wn/02d@2x.png",
    },
    night: {
      description: "Có mây",
      image: "http://openweathermap.org/img/wn/02n@2x.png",
    },
  },
  3: {
    day: {
      description: "Có mây",
      image: "http://openweathermap.org/img/wn/03d@2x.png",
    },
    night: {
      description: "Có mây",
      image: "http://openweathermap.org/img/wn/03n@2x.png",
    },
  },
  45: {
    day: {
      description: "Có sương",
      image: "http://openweathermap.org/img/wn/50d@2x.png",
    },
    night: {
      description: "Có sương",
      image: "http://openweathermap.org/img/wn/50n@2x.png",
    },
  },
  48: {
    day: {
      description: "Có sương",
      image: "http://openweathermap.org/img/wn/50d@2x.png",
    },
    night: {
      description: "Có sương",
      image: "http://openweathermap.org/img/wn/50n@2x.png",
    },
  },
  51: {
    day: {
      description: "Mưa phùn",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Mưa phùn",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  53: {
    day: {
      description: "Mưa phùn",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Mưa phùn",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  55: {
    day: {
      description: "Mưa phùn",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Mưa phùn",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  56: {
    day: {
      description: "Mưa phùn",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Mưa phùn",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  57: {
    day: {
      description: "Mưa phùn",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Mưa phùn",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  61: {
    day: {
      description: "Có mưa",
      image: "http://openweathermap.org/img/wn/10d@2x.png",
    },
    night: {
      description: "Có mưa",
      image: "http://openweathermap.org/img/wn/10n@2x.png",
    },
  },
  63: {
    day: {
      description: "Có mưa",
      image: "http://openweathermap.org/img/wn/10d@2x.png",
    },
    night: {
      description: "Có mưa",
      image: "http://openweathermap.org/img/wn/10n@2x.png",
    },
  },
  65: {
    day: {
      description: "Mưa to",
      image: "http://openweathermap.org/img/wn/10d@2x.png",
    },
    night: {
      description: "Mưa to",
      image: "http://openweathermap.org/img/wn/10n@2x.png",
    },
  },
  66: {
    day: {
      description: "Có mưa",
      image: "http://openweathermap.org/img/wn/10d@2x.png",
    },
    night: {
      description: "Có mưa",
      image: "http://openweathermap.org/img/wn/10n@2x.png",
    },
  },
  67: {
    day: {
      description: "Có mưa",
      image: "http://openweathermap.org/img/wn/10d@2x.png",
    },
    night: {
      description: "Có mưa",
      image: "http://openweathermap.org/img/wn/10n@2x.png",
    },
  },
  71: {
    day: {
      description: "Light Snow",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Light Snow",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  73: {
    day: {
      description: "Snow",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Snow",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  75: {
    day: {
      description: "Heavy Snow",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Heavy Snow",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  77: {
    day: {
      description: "Snow GCó mưas",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Snow GCó mưas",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  80: {
    day: {
      description: "Mưa rào",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Mưa rào",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  81: {
    day: {
      description: "Mưa rào",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Mưa rào",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  82: {
    day: {
      description: "Mưa rào",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Mưa rào",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  85: {
    day: {
      description: "Mưa rào",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Mưa rào",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  86: {
    day: {
      description: "Snow Mưa rào",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Snow Mưa rào",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  95: {
    day: {
      description: "Sấm sét",
      image: "http://openweathermap.org/img/wn/11d@2x.png",
    },
    night: {
      description: "Sấm sét",
      image: "http://openweathermap.org/img/wn/11n@2x.png",
    },
  },
  96: {
    day: {
      description: "Sấm sét",
      image: "http://openweathermap.org/img/wn/11d@2x.png",
    },
    night: {
      description: "Sấm sét",
      image: "http://openweathermap.org/img/wn/11n@2x.png",
    },
  },
  99: {
    day: {
      description: "Sấm sét",
      image: "http://openweathermap.org/img/wn/11d@2x.png",
    },
    night: {
      description: "Sấm sét",
      image: "http://openweathermap.org/img/wn/11n@2x.png",
    },
  },
};

export default WMO_CODES;
