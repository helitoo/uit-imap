import { TourScene } from "@/lib/types/pano";

export const tourScenes: TourScene[] = [{
    id: "0-cng-trc-uit",
    name: "Cổng trước UIT",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      yaw: -0.41169524391809986,
      pitch: -0.3655043919754597,
      fov: 1.3515645157043683
    },
    linkHotspots: [{
      yaw: -0.007931969712078768,
      pitch: 0.026348056580268064,
      rotation: 5.497787143782138,
      target: "1-vo-cng-uit"
    }],
    infoHotspots: []
  }, {
    id: "1-vo-cng-uit",
    name: "Vào cổng UIT",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      yaw: 1.7089134673850124,
      pitch: -0.1463727416308167,
      fov: 1.3515645157043683
    },
    linkHotspots: [{
      yaw: 1.4598676105132053,
      pitch: 0.00486877790087803,
      rotation: 0,
      target: "2-trc-nh-a---e"
    }, {
      yaw: -0.13366929166658537,
      pitch: 0.0020313240953129252,
      rotation: 0.7853981633974483,
      target: "13-nh-gi-xe"
    }],
    infoHotspots: []
  }, {
    id: "2-trc-nh-a---e",
    name: "Trước nhà A - E",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      yaw: -1.1570490838140515,
      pitch: -0.2866434871921548,
      fov: 1.3515645157043683
    },
    linkHotspots: [{
      yaw: -1.4228787400213907,
      pitch: -0.06638058927915758,
      rotation: 0,
      target: "3-hnh-lang-nh-e"
    }, {
      yaw: -0.005192747328788272,
      pitch: 0.06790960354424236,
      rotation: 5.497787143782138,
      target: "4-nh-gi-xe-nh-e"
    }, {
      yaw: -2.1251942345891948,
      pitch: -0.03350011495822791,
      rotation: 5.497787143782138,
      target: "14-nh-a-t-cng"
    }],
    infoHotspots: []
  }, {
    id: "3-hnh-lang-nh-e",
    name: "Hành lang nhà E",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -1.5777001489799005,
      pitch: 0.055895834354746654,
      rotation: 0.7853981633974483,
      target: "11-sn-gch"
    }, {
      yaw: -0.07654943329888653,
      pitch: 0.07054986695598942,
      rotation: 0,
      target: "5-nh-c"
    }, {
      yaw: 1.6334934106166088,
      pitch: 0.055480097251093596,
      rotation: 0.7853981633974483,
      target: "2-trc-nh-a---e"
    }, {
      yaw: 1.1167525199532058,
      pitch: -0.06704950389520192,
      rotation: 5.497787143782138,
      target: "19-tng-1-nh-e"
    }, {
      yaw: -2.9595741151095147,
      pitch: -0.043354808858840244,
      rotation: 0,
      target: "18-ging-ng-nh-a"
    }, {
      yaw: 2.9561260463593797,
      pitch: -0.014983910326408889,
      rotation: 6.283185307179586,
      target: "31-nh-a-data-center"
    }],
    infoHotspots: []
  }, {
    id: "4-nh-gi-xe-nh-e",
    name: "Nhà gửi xe nhà E",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      yaw: 0.5189496835309324,
      pitch: -0.22243011748534514,
      fov: 1.3515645157043683
    },
    linkHotspots: [{
      yaw: -2.0382390479479646,
      pitch: 0.0000397305229977718,
      rotation: 0.7853981633974483,
      target: "2-trc-nh-a---e"
    }, {
      yaw: 0.9534134185408742,
      pitch: 0.024099526391509585,
      rotation: 5.497787143782138,
      target: "10-sn-bng"
    }, {
      yaw: -0.24441543781470543,
      pitch: -0.025592516967680723,
      rotation: 0,
      target: "19-tng-1-nh-e"
    }],
    infoHotspots: []
  }, {
    id: "5-nh-c",
    name: "Nhà C",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -0.4376594791302093,
      pitch: 0.0038746185623494966,
      rotation: 5.497787143782138,
      target: "3-hnh-lang-nh-e"
    }, {
      yaw: 0.22179261732656919,
      pitch: 0.0014934786237308373,
      rotation: 0,
      target: "11-sn-gch"
    }, {
      yaw: 0.7300258645526672,
      pitch: 0.029005634119606327,
      rotation: 0.7853981633974483,
      target: "8-hc-hc-clc-nh-c"
    }, {
      yaw: -0.9379297933739608,
      pitch: 0.021729240311367803,
      rotation: 5.497787143782138,
      target: "7-phng-hc-nh-c"
    }, {
      yaw: -2.15694185347909,
      pitch: 0.0040122225729177785,
      rotation: 0.7853981633974483,
      target: "9-phng-thc-hnh"
    }, {
      yaw: -0.07369807505551407,
      pitch: -0.14482665264942973,
      rotation: 0,
      target: "6-tng-2-nh-c"
    }],
    infoHotspots: []
  }, {
    id: "6-tng-2-nh-c",
    name: "Tầng 2 nhà C",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1591,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -3.032942350415283,
      pitch: 0.15999492820605354,
      rotation: 3.141592653589793,
      target: "5-nh-c"
    }],
    infoHotspots: []
  }, {
    id: "7-phng-hc-nh-c",
    name: "Phòng học nhà C",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 0.5958179493238696,
      pitch: 0.030482506048675972,
      rotation: 1.5707963267948966,
      target: "5-nh-c"
    }],
    infoHotspots: []
  }, {
    id: "8-hc-hc-clc-nh-c",
    name: "Học học CLC nhà C",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 1.6981106830300572,
      pitch: 0.1443048046107549,
      rotation: 0.7853981633974483,
      target: "5-nh-c"
    }],
    infoHotspots: []
  }, {
    id: "9-phng-thc-hnh",
    name: "Phòng thực hành",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 1.6335734020105246,
      pitch: 0.07856493730707115,
      rotation: 7.853981633974483,
      target: "5-nh-c"
    }],
    infoHotspots: []
  }, {
    id: "10-sn-bng",
    name: "Sân bóng",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      yaw: 0.8468461206533942,
      pitch: -0.22078463146979743,
      fov: 1.3515645157043683
    },
    linkHotspots: [{
      yaw: 1.4387589279401123,
      pitch: -0.049446935766077615,
      rotation: 0.7853981633974483,
      target: "5-nh-c"
    }, {
      yaw: -2.6452831719287975,
      pitch: -0.021782359201475643,
      rotation: 0.7853981633974483,
      target: "30-cng-sau-uit"
    }],
    infoHotspots: []
  }, {
    id: "11-sn-gch",
    name: "Sân gạch",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 0.27076431024494596,
      pitch: 0.012203561847359268,
      rotation: 5.497787143782138,
      target: "3-hnh-lang-nh-e"
    }, {
      yaw: 2.911558346286662,
      pitch: -0.011861752085408739,
      rotation: 0.7853981633974483,
      target: "32-snh-nh-b"
    }, {
      yaw: -2.2255074920468445,
      pitch: 0.052461734799194915,
      rotation: 0.7853981633974483,
      target: "5-nh-c"
    }],
    infoHotspots: []
  }, {
    id: "12-nh-dch-v",
    name: "Nhà dịch vụ",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1591,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 0.15574940907151813,
      pitch: -0.012476247526024054,
      rotation: 0,
      target: "11-sn-gch"
    }],
    infoHotspots: []
  }, {
    id: "13-nh-gi-xe",
    name: "Nhà gửi xe",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      yaw: 0.846988674445214,
      pitch: -0.21184924645620384,
      fov: 1.3515645157043683
    },
    linkHotspots: [{
      yaw: -0.17133936141033423,
      pitch: 0.06156566880869008,
      rotation: 0.7853981633974483,
      target: "15-nh-a-t-nh-xe"
    }],
    infoHotspots: []
  }, {
    id: "14-nh-a-t-cng",
    name: "Nhà A từ cổng",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1591,
    initialViewParameters: {
      yaw: -2.381391075542494,
      pitch: 0.007571003877458793,
      fov: 1.3515645157043683
    },
    linkHotspots: [{
      yaw: -3.0373810715493104,
      pitch: 0.12402897268546376,
      rotation: 11.780972450961727,
      target: "2-trc-nh-a---e"
    }, {
      yaw: -0.08247139727097164,
      pitch: 0.013004384829031324,
      rotation: 0,
      target: "15-nh-a-t-nh-xe"
    }, {
      yaw: 1.684104570144454,
      pitch: -0.06060812908262392,
      rotation: 0,
      target: "17-tng-2-nh-a"
    }, {
      yaw: 1.4043948262054275,
      pitch: -0.011080038334196018,
      rotation: 0,
      target: "3-hnh-lang-nh-e"
    }],
    infoHotspots: []
  }, {
    id: "15-nh-a-t-nh-xe",
    name: "Nhà A từ nhà xe",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      yaw: 0.9889544363519498,
      pitch: -0.14639141877175632,
      fov: 1.3515645157043683
    },
    linkHotspots: [{
      yaw: 1.4681799432484803,
      pitch: 0.048183284144826644,
      rotation: 0,
      target: "13-nh-gi-xe"
    }, {
      yaw: 0.024553972722964446,
      pitch: 0.07567234325811611,
      rotation: 0,
      target: "14-nh-a-t-cng"
    }, {
      yaw: -1.5095418106258176,
      pitch: 0.01625912698174048,
      rotation: 0,
      target: "41-nh-a---ni-xe-a-n"
    }, {
      yaw: -3.0477471425348703,
      pitch: 0.0013121965396578616,
      rotation: 0,
      target: "16-th-vin-nh-a"
    }, {
      yaw: -1.996113251024532,
      pitch: -0.2954297056053754,
      rotation: 5.497787143782138,
      target: "17-tng-2-nh-a"
    }],
    infoHotspots: []
  }, {
    id: "16-th-vin-nh-a",
    name: "Thư viện nhà A",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -0.07635268349873847,
      pitch: 0.0901490137027885,
      rotation: 0,
      target: "15-nh-a-t-nh-xe"
    }],
    infoHotspots: []
  }, {
    id: "17-tng-2-nh-a",
    name: "Tầng 2 nhà A",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 0.9440033208299461,
      pitch: -0.1773313474058824,
      rotation: 0.7853981633974483,
      target: "18-ging-ng-nh-a"
    }, {
      yaw: 1.3996907089736776,
      pitch: 0.11493587780645775,
      rotation: 3.141592653589793,
      target: "15-nh-a-t-nh-xe"
    }],
    infoHotspots: []
  }, {
    id: "18-ging-ng-nh-a",
    name: "Giảng đường nhà A",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 0.035494878162154464,
      pitch: -0.11470504660337077,
      rotation: 3.141592653589793,
      target: "14-nh-a-t-cng"
    }],
    infoHotspots: []
  }, {
    id: "19-tng-1-nh-e",
    name: "Tầng 1 nhà E",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 2.6180358223732227,
      pitch: 0.049245776777128825,
      rotation: 4.71238898038469,
      target: "20-nh-v-sinh-nh-e"
    }, {
      yaw: -3.081160894873433,
      pitch: 0.003168708600304271,
      rotation: 0,
      target: "21-tng-2-nh-e"
    }, {
      yaw: 0.1577695929569387,
      pitch: 0.1958045169273923,
      rotation: 3.141592653589793,
      target: "3-hnh-lang-nh-e"
    }],
    infoHotspots: []
  }, {
    id: "20-nh-v-sinh-nh-e",
    name: "Nhà vệ sinh nhà E",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1591,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 0.9069478410983578,
      pitch: 0.11023565786935308,
      rotation: 4.71238898038469,
      target: "19-tng-1-nh-e"
    }],
    infoHotspots: []
  }, {
    id: "21-tng-2-nh-e",
    name: "Tầng 2 nhà E",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1591,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -0.4307975687782619,
      pitch: 0.03941103573736626,
      rotation: 0,
      target: "22-th-vin-nh-e"
    }, {
      yaw: 1.546521443197328,
      pitch: -0.11901546058116352,
      rotation: 0,
      target: "23-tng-5-khoa-khoa-hc-my-tnh"
    }, {
      yaw: 1.5367245066865163,
      pitch: 0.43030861514982455,
      rotation: 3.141592653589793,
      target: "19-tng-1-nh-e"
    }],
    infoHotspots: []
  }, {
    id: "22-th-vin-nh-e",
    name: "Thư viện nhà E",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1591,
    initialViewParameters: {
      yaw: -1.1248736579192844,
      pitch: 0.020365780637387587,
      fov: 1.3515645157043683
    },
    linkHotspots: [{
      yaw: -0.8171335918577007,
      pitch: 0.1188852422846498,
      rotation: 0,
      target: "21-tng-2-nh-e"
    }],
    infoHotspots: []
  }, {
    id: "23-tng-5-khoa-khoa-hc-my-tnh",
    name: "Tầng 5 Khoa Khoa học máy tính",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1591,
    initialViewParameters: {
      yaw: 0.5492490859669523,
      pitch: 0,
      fov: 1.3515645157043683
    },
    linkHotspots: [{
      yaw: 1.4924187443276926,
      pitch: 0.07050125573682564,
      rotation: 0,
      target: "24-mmlab-uit"
    }, {
      yaw: 2.8134509183110037,
      pitch: -0.09787175960294903,
      rotation: 0,
      target: "25-tng-6-khoa-k-thut-my-tnh"
    }, {
      yaw: 2.8019056665815043,
      pitch: 0.2563421737699336,
      rotation: 3.141592653589793,
      target: "21-tng-2-nh-e"
    }],
    infoHotspots: []
  }, {
    id: "24-mmlab-uit",
    name: "MMLab UIT",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1591,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -0.5889498906820485,
      pitch: 0.027756841353490103,
      rotation: 0,
      target: "23-tng-5-khoa-khoa-hc-my-tnh"
    }],
    infoHotspots: []
  }, {
    id: "25-tng-6-khoa-k-thut-my-tnh",
    name: "Tầng 6 Khoa Kỹ thuật máy tính",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1591,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 2.996069703421309,
      pitch: -0.11623227808669334,
      rotation: 0,
      target: "26-tng-7-khoa-cng-ngh-phn-mm"
    }, {
      yaw: 3.0299686376669186,
      pitch: 0.396380103156563,
      rotation: 3.141592653589793,
      target: "23-tng-5-khoa-khoa-hc-my-tnh"
    }],
    infoHotspots: []
  }, {
    id: "26-tng-7-khoa-cng-ngh-phn-mm",
    name: "Tầng 7 Khoa Công nghệ phần mềm",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1591,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -3.132995525823514,
      pitch: -0.10035559185382148,
      rotation: 0,
      target: "27-tng-8-khoa-mng-my-tnh-v-truyn-thng"
    }, {
      yaw: -3.091692385383853,
      pitch: 0.3178012237481216,
      rotation: 3.141592653589793,
      target: "25-tng-6-khoa-k-thut-my-tnh"
    }],
    infoHotspots: []
  }, {
    id: "27-tng-8-khoa-mng-my-tnh-v-truyn-thng",
    name: "Tầng 8 khoa Mạng máy tính và truyền thông",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1591,
    initialViewParameters: {
      yaw: -0.14470168001751915,
      pitch: -0.035331351428130375,
      fov: 1.3515645157043683
    },
    linkHotspots: [{
      yaw: 1.8334946948131883,
      pitch: -0.09390660448827148,
      rotation: 0,
      target: "28-tng-9-khoa-h-thng-thng-tin"
    }, {
      yaw: 1.8417168544724705,
      pitch: 0.2515219308240191,
      rotation: 3.141592653589793,
      target: "26-tng-7-khoa-cng-ngh-phn-mm"
    }],
    infoHotspots: []
  }, {
    id: "28-tng-9-khoa-h-thng-thng-tin",
    name: "Tầng 9 khoa Hệ thống thông tin",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1591,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 0.7047321270830267,
      pitch: -0.07192876010482152,
      rotation: 0,
      target: "42-tng-11-khu-vc-doanh-nghip-nghin-cu"
    }, {
      yaw: 0.7400165122319464,
      pitch: 0.27962729137319897,
      rotation: 9.42477796076938,
      target: "27-tng-8-khoa-mng-my-tnh-v-truyn-thng"
    }],
    infoHotspots: []
  }, {
    id: "29-trc-hi-trng-nh-e",
    name: "Trước hội trường nhà E",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1591,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -3.13036954904773,
      pitch: 0.08195716096159522,
      rotation: 3.141592653589793,
      target: "42-tng-11-khu-vc-doanh-nghip-nghin-cu"
    }, {
      yaw: 0.11956256903207318,
      pitch: 0.12006956110356093,
      rotation: 3.141592653589793,
      target: "3-hnh-lang-nh-e"
    }, {
      yaw: -1.6363143744696167,
      pitch: -0.08476124716245792,
      rotation: 0,
      target: "44-tng-12-hi-trng-e"
    }, {
      yaw: -2.437046225386865,
      pitch: -0.10482473739893194,
      rotation: 0,
      target: "45-tng-thng-nh-e"
    }],
    infoHotspots: []
  }, {
    id: "30-cng-sau-uit",
    name: "Công sau UIT",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1414,
    initialViewParameters: {
      yaw: -0.804735019118274,
      pitch: -0.31041115897569327,
      fov: 1.3515645157043683
    },
    linkHotspots: [{
      yaw: -0.10603380231032489,
      pitch: -0.0035428660732890194,
      rotation: 0,
      target: "10-sn-bng"
    }],
    infoHotspots: []
  }, {
    id: "31-nh-a-data-center",
    name: "Nhà A Data Center",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 2048,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -1.994330368319023,
      pitch: 0.2715533290010317,
      rotation: 0,
      target: "3-hnh-lang-nh-e"
    }],
    infoHotspots: []
  }, {
    id: "32-snh-nh-b",
    name: "Sảnh nhà B",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 2048,
    initialViewParameters: {
      yaw: -1.8911455261194607,
      pitch: -0.5641618158671733,
      fov: 1.279021002758625
    },
    linkHotspots: [{
      yaw: -2.816792325160989,
      pitch: 0.011310338240196671,
      rotation: 0,
      target: "11-sn-gch"
    }, {
      yaw: -1.0403267185583722,
      pitch: -0.07439824084949365,
      rotation: 0,
      target: "34-nh-b---check-in-2"
    }, {
      yaw: -0.1562702679242438,
      pitch: -0.05178898846029334,
      rotation: 0,
      target: "33-nh-b---check-in-1"
    }, {
      yaw: -1.9803412044187727,
      pitch: -0.0733574731153599,
      rotation: 0,
      target: "35-nh-b---check-in-3"
    }, {
      yaw: 0.37379023249274645,
      pitch: 0.02900397099176466,
      rotation: 0,
      target: "12-nh-dch-v"
    }],
    infoHotspots: []
  }, {
    id: "33-nh-b---check-in-1",
    name: "Nhà B - Check In 1",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 2048,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 1.2990651199412735,
      pitch: 0.038779149829801796,
      rotation: 0,
      target: "40-nh-b-tng-3"
    }, {
      yaw: 0.39422428422653155,
      pitch: 0.09211725628995815,
      rotation: 5.497787143782138,
      target: "36-nh-b-phng-hc"
    }, {
      yaw: -2.11487585080037,
      pitch: 0.04479209585883481,
      rotation: 1.5707963267948966,
      target: "38-nh-b-phng-my-clc"
    }, {
      yaw: -2.6288017397008367,
      pitch: -0.009336727544987156,
      rotation: 0,
      target: "40-nh-b-tng-3"
    }, {
      yaw: 2.385178849384049,
      pitch: 0.14292983965411032,
      rotation: 0,
      target: "32-snh-nh-b"
    }],
    infoHotspots: []
  }, {
    id: "34-nh-b---check-in-2",
    name: "Nhà B - Check In 2",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 2048,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 0.3570066349659182,
      pitch: 0.277711612342852,
      rotation: 0,
      target: "32-snh-nh-b"
    }, {
      yaw: -1.5413257376061047,
      pitch: 0.030090330081417704,
      rotation: 10.995574287564278,
      target: "36-nh-b-phng-hc"
    }, {
      yaw: 2.489263243559228,
      pitch: 0.034149581139802265,
      rotation: 1.5707963267948966,
      target: "38-nh-b-phng-my-clc"
    }, {
      yaw: 1.8863850259432438,
      pitch: 0.053644268802592876,
      rotation: 6.283185307179586,
      target: "40-nh-b-tng-3"
    }, {
      yaw: -1.0728815582295326,
      pitch: 0.07338344295755128,
      rotation: 18.84955592153877,
      target: "40-nh-b-tng-3"
    }],
    infoHotspots: []
  }, {
    id: "35-nh-b---check-in-3",
    name: "Nhà B - Check In 3",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 2048,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -0.0030606689128536146,
      pitch: 0.22702883499352922,
      rotation: 0,
      target: "32-snh-nh-b"
    }, {
      yaw: -1.4435272557364645,
      pitch: 0.05454257172652888,
      rotation: 0,
      target: "40-nh-b-tng-3"
    }, {
      yaw: 2.4971061226839026,
      pitch: 0.1294914502982536,
      rotation: 0.7853981633974483,
      target: "36-nh-b-phng-hc"
    }, {
      yaw: 1.9267039150690692,
      pitch: 0.06891572486041397,
      rotation: 0.7853981633974483,
      target: "38-nh-b-phng-my-clc"
    }, {
      yaw: 1.3899340046487616,
      pitch: -0.010918932606909237,
      rotation: 0,
      target: "40-nh-b-tng-3"
    }],
    infoHotspots: []
  }, {
    id: "36-nh-b-phng-hc",
    name: "Nhà B Phòng học",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 2048,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -2.3667850612949266,
      pitch: 0.18040877470242833,
      rotation: 0,
      target: "34-nh-b---check-in-2"
    }],
    infoHotspots: []
  }, {
    id: "37-nh-b-phng-hc-ln",
    name: "Nhà B Phòng học lớn",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 2048,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 0.4389984698434688,
      pitch: 0.033149455952774076,
      rotation: 0,
      target: "40-nh-b-tng-3"
    }],
    infoHotspots: []
  }, {
    id: "38-nh-b-phng-my-clc",
    name: "Nhà B Phòng máy CLC",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 2048,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 0.39549655495362224,
      pitch: -0.047642551155426816,
      rotation: 0.7853981633974483,
      target: "34-nh-b---check-in-2"
    }],
    infoHotspots: []
  }, {
    id: "39-nh-b-phng-my-clc-2",
    name: "Nhà B Phòng máy CLC 2",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 2048,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -0.39184491148552425,
      pitch: 0.006364813728287899,
      rotation: 0,
      target: "40-nh-b-tng-3"
    }],
    infoHotspots: []
  }, {
    id: "40-nh-b-tng-3",
    name: "Nhà B Tầng 3",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 2048,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 1.794185378458165,
      pitch: -0.0042464624009959095,
      rotation: 7.0685834705770345,
      target: "39-nh-b-phng-my-clc-2"
    }, {
      yaw: -2.0426577329076583,
      pitch: 0.05228316812051759,
      rotation: 5.497787143782138,
      target: "37-nh-b-phng-hc-ln"
    }, {
      yaw: 1.1654266053744262,
      pitch: 0.13147894168360352,
      rotation: 3.141592653589793,
      target: "34-nh-b---check-in-2"
    }, {
      yaw: -1.4568079200539188,
      pitch: 0.13806818833072576,
      rotation: 3.141592653589793,
      target: "34-nh-b---check-in-2"
    }, {
      yaw: -0.12494941073380161,
      pitch: 0.43409713245600656,
      rotation: 12.566370614359176,
      target: "32-snh-nh-b"
    }],
    infoHotspots: []
  }, {
    id: "41-nh-a---ni-xe-a-n",
    name: "Nhà A - Nơi xe đưa đón",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 2048,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -2.167379853056218,
      pitch: 0.0979121171739088,
      rotation: 0.7853981633974483,
      target: "3-hnh-lang-nh-e"
    }, {
      yaw: -0.030482961616604243,
      pitch: 0.12494284102349695,
      rotation: 0,
      target: "15-nh-a-t-nh-xe"
    }, {
      yaw: 0.5135844485849912,
      pitch: -0.11252621477919433,
      rotation: 0,
      target: "18-ging-ng-nh-a"
    }],
    infoHotspots: []
  }, {
    id: "42-tng-11-khu-vc-doanh-nghip-nghin-cu",
    name: "Tầng 11 Khu vực doanh nghiệp nghiên cứu",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 2048,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 0.011224276485554796,
      pitch: -0.15759961558735647,
      rotation: 0,
      target: "29-trc-hi-trng-nh-e"
    }, {
      yaw: 0.027507963375882127,
      pitch: 0.2337881092082057,
      rotation: 3.141592653589793,
      target: "28-tng-9-khoa-h-thng-thng-tin"
    }, {
      yaw: -1.3372810816620344,
      pitch: 0.09747718861746613,
      rotation: 5.497787143782138,
      target: "43-tng-11-cng-ty-rosen"
    }],
    infoHotspots: []
  }, {
    id: "43-tng-11-cng-ty-rosen",
    name: "Tầng 11 Công ty Rosen",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 2048,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -1.8936616229115213,
      pitch: 0.11795782026910118,
      rotation: 0,
      target: "42-tng-11-khu-vc-doanh-nghip-nghin-cu"
    }],
    infoHotspots: []
  }, {
    id: "44-tng-12-hi-trng-e",
    name: "Hội trường E",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 2048,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 0.0077893321540862814,
      pitch: -0.0031227212252140646,
      rotation: 0,
      target: "29-trc-hi-trng-nh-e"
    }],
    infoHotspots: []
  }, {
    id: "45-tng-thng-nh-e",
    name: "Tầng thượng nhà E",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 2048,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 2.9419877680749025,
      pitch: 0.11879896788763844,
      rotation: 3.141592653589793,
      target: "29-trc-hi-trng-nh-e"
    }],
    infoHotspots: []
  }] satisfies TourScene[];
