// Archivo channels.js

var Canales = {
    "TUDN": {
        name: "TUDN México",
        url: "https://zap-live1-ott.izzigo.tv/11/out/u/dash/TUDN-HD/default.mpd",
        k1: "2722647f77b44824c432a3c4555830a2",
        k2: "1734befb82f4b438bd84195f6c212e7b"
    },
    "AZTECA7": {
        name: "Azteca 7",
        url: "https://zap-live1-ott.izzigo.tv/4/out/u/dash/AZTECA-7-HD/default.mpd",
        k1: "c15a10921bed75a3ec5385e0ecdb6499",
        k2: "4e44df62547a1544a4623418918658d0"
    },
    "AZTECA72": {
        name: "Azteca 7 Op2",
        url: "https://mdstrm.com/live-stream-playlist/609ad46a7a441137107d7a81.m3u8"
    },
    "AZTECA73": {
        name: "Azteca 7 Op3",
        url: "https://dai.google.com/linear/hls/event/YHoOj51dSKCvBQOBG2OvLQ/master.m3u8"
    },
    "AZTECA74": {
        name: "Azteca 7 Op4",
        url: "https://pubads.g.doubleclick.net/ssai/event/YHoOj51dSKCvBQOBG2OvLQ/master.m3u8"
    },
    "AZTECADEPORTES": {
        name: "Azteca Deportes",
        url: "https://mdstrm.com/live-stream-playlist/61087e5b8e21e304a159211e.m3u8"
    },
    "AZTECADEPORTES2": {
        name: "Azteca Deportes 2",
        url: "https://mdstrm.com/live-stream-playlist/5ff464aaf89edc69bfe55de9.m3u8"
    },
    "AZTECADEPORTES3": {
        name: "Azteca Deportes 3",
        url: "https://mdstrm.com/live-stream-playlist/5ff4650032ebd651c24732c8.m3u8"
    },
    "FOXSPORTSMX4": {
        name: "Fox Sports MX 4",
        embed: "https://streamtpmedia.com/global2.php?stream=foxsportsmx"
    },
    "CANAL5MX": {
        name: "Canal 5 MX",
        url: "https://zap-live1-ott.izzigo.tv/2/out/u/dash/CANAL-5-HD/default.mpd",
        k1: "578f77c2e0fb7b31b1676b75b57fe922",
        k2: "6e5ee266b112e58a0e27e4384b03ed76"
    },
    "TUBI": {
        name: "Tubi",
        url: "https://apollo.production-public.tubi.io/live/fox-en-tubi-dynamic-ad-breaks-aQpF7H.m3u8",
    },
    "TUBIEXTRA": {
        name: "Tubi Extra",
        url: "https://aegis-cloudfront-1.tubi.video/0b3b6122-078c-4c89-ae5e-f548b9b1e382/playlist.m3u8",
    },
    "TUBIUS": {
        name: "Tubi Usa",
        url: "https://apollo.production-public.tubi.io/live/fox-sports-on-tubi-5FPHpS.m3u8",
    },
    "ESTRELLAS2": {
        name: "Las Estrellas 2",
        url: "https://channel01-onlymex.akamaized.net/hls/live/2022749/event01/index.m3u8",
        epg_id: "latino:lasestrellas"
    },
    "FOXSPORTS1MX2": {
        name: "FOX Sports MX Op2",
        url: "https://ottb.live.cf.ww.aiv-cdn.net/iad-nitro/live/clients/dash/enc/oboxe53wyo/out/v1/f7892a9d706d419a846d738fa22ea33e/cenc.mpd",
        k1: "2fbdaa3bea0d0323ae011b318d1db716",
        k2: "8726ef7eaf5b9dce15fb6aa9f80bd53f"
    },
    "FOXSPORTS2MX2": {
        name: "FOX Sports 2 MX Op2",
        url: "https://ottb.live.cf.ww.aiv-cdn.net/iad-nitro/live/clients/dash/enc/tepjqej1ys/out/v1/c9c9159baee749a19612b1598495859a/cenc.mpd",
        k1: "8836fb04d62dc64c9f8a39ef8640d5eb",
        k2: "d4f05ce56c5231b7cdf53455bea58621"
    },
    "FOXSPORTS3MX2": {
        name: "FOX Sports 3 MX Op2",
        url: "https://ottb.live.cf.ww.aiv-cdn.net/iad-nitro/live/clients/dash/enc/wybgz0orr8/out/v1/2f6d1612abd44f5883917f8a585b955f/cenc.mpd",
        k1: "11c8c1c2ef0385cf1e64d44bb9c3a395",
        k2: "5769730ffbdc4b2fd8945929d9ace063"
    },
    "FOXSPORTSPREMIUMMX": {
        name: "FOX Sports Premium MX",
        url: "https://ottb.live.cf.ww.aiv-cdn.net/iad-nitro/live/clients/dash/enc/fdx74zqzhu/out/v1/7d7a8c6981a842b98a683e9fbfe51d17/cenc.mpd",
        k1: "9f327d24c66fbd84e15ab5c9ead7c7a4",
        k2: "83837185529c0c4048f81386c2d36426"
    }, 
    "ESPN1MX2": {
        name: "ESPN MX Op2",
        url: "https://livedashmx.cdn.startv.tv/bpk-tv/espn/vmx/index.mpd",
        k1: "227153e801d97c9c672ddb65d0f7d139",
        k2: "2d37b9e083bb849b6e913d817de2b8f2"   
    },
    "ESPN2MX": {
        name: "ESPN 2 MX",
        url: "https://dish.akamaized.net/Content/DASH/Live/channel(espn_2)/manifest.mpd",
        k1: "ae99daa35220336fe9460b9060fa65a9",
        k2: "ac284e8e24296f30496d1f39a7138205"
    },
    "ESPN3MX": {
        name: "ESPN 3 MX",
        url: "https://dish.akamaized.net/Content/DASH/Live/channel(espn_3)/manifest.mpd",
        k1: "430f38110162f19a042b4dcdc2005140",
        k2: "50541179fbd5750aea8767cb6e6b3a7b" 
    },
    "TVCDEPORTES": {
        name: "TVC Deportes",
        url: "https://dish.akamaized.net/Content/DASH/Live/channel(tvcdeportes)/manifest.mpd",
        k1: "ffdd8c79a09c11c5d42bc4f2d85bded7",
        k2: "72adc5405cee0fc1288bc75b8ef11759"    
    },
     "CALIENTETV": {
        name: "Caliente TV",
        url: "https://cdn-calisports-pri-01.vos360.video/Content/Channel/estudionew/DASH/master.mpd",
        k1: "6667149228ff1815a7e8deb7830795e8",
        k2: "3de937ad80ad2dd6c93be761427160d3"  
    },
    "TV41 ": {
        name: "TV4.1",
        url: "https://5ca3e84a76d30.streamlock.net/tv4/videotv4/playlist.m3u8"
    },
    "TV42 ": {
        name: "TV4.2",
        url: "https://5f2c1b0d880e5.streamlock.net/tv42/videotv42/playlist.m3u8"
    },
    "TV4_3 ": {
        name: "TV4.3",
        url: "https://5f1af61612fb5.streamlock.net/tv43gto/smil:tv43gto.smil/playlist.m3u8"
    },
    "TV4_4 ": {
        name: "TV4.4",
        url: "https://5ca3e84a76d30.streamlock.net/tv44gto/smil:tv44gto.smil/playlist.m3u8"
    },
    "ESTRELLATV": {
        name: "Star TV",
        url: "https://estrellatv-oando.amagi.tv/playlist.m3u8"
    },
    "ESTRELLATV2": {
        name: "Star TV Op2",
        url: "https://apollo.production-public.tubi.io/live/estrellatv-mexico-3uip8E.m3u8"
    },
    "AMAS": {
        name: "A+",
        url: "https://mdstrm.com/live-stream-playlist/60b56be1000ea50835fa1e63.m3u8"
    },
    "AZ1": {
        name: "Azteca UNO",
        url: "https://mdstrm.com/live-stream-playlist/609b243156cca108312822a6.m3u8"
    },
    "TELEMUNDO": {
        name: "Telemundo",
        url: "https://cdn.igocast.com/wkrp_channel1_hls/wkrp_channel1_profile1.m3u8"
    },
    "CLAROSPORTS": {
        name: "Claro Sports",
        url: "https://dai.google.com/linear/hls/event/yINISWAPQ0CPhPixe-40wQ/master.m3u8"
    },
    "AYMSPORTS": {
        name: "AYM Sports",
        url: "https://aym-as.otteravision.com/aym/as/as.m3u8"
    },
    "LAS": {
        name: "Latin American Sports",
        url: "https://aym-laspo.otteravision.com/aym/laspo/laspo.m3u8"
    },
    "ITV": {
        name: "ITV Deportes",
        url: "https://thm-it-roku.otteravision.com/thm/it/it.m3u8"
    },
    "TSN1": {
        name: "TSN 1 CA",
        url: "https://ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/dash/enc/u142pfptsm/out/v1/1caa3b2dfa9e448d8f61209bdfc1acdc/cenc.mpd",
        k1: "7e99f734748d098cbfa2f7bde968dd44",
        k2: "98ea6088c3222e9abaf61e537804d6cc"
    },
    "TSN2": {
        name: "TSN 2 CA",
        url: "https://ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/dash/enc/v5v9yfn62i/out/v1/0991e33d09da46b2857fcc845db95c40/cenc.mpd",
        k1: "362202eefc5d9e42eec6450998cce9e8",
        k2: "978dfdd53186ec587d940e0bd1e2ec42"
    },
    "TSN3": {
        name: "TSN 3 CA",
        url: "https://ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/dash/enc/mrskysvotx/out/v1/ad58961bd8fd48d2944e461c034b8914/cenc.mpd",
        k1: "c0f378ad54e14a9c85a3d8c986d2a51f",
        k2: "5e1d040743ff78715e464ffb905e68a9"
    },
    "TSN4": {
        name: "TSN 4 CA",
        url: "https://abm5x5xaaaaaaaampk3nj4fzz34qg.otte.live.cf.ww.aiv-cdn.net/pdx-nitro/live/clients/dash/enc/irtfdsri14/out/v1/165128c314e944faa3d79e107974b323/cenc.mpd",
        k1: "e1aa4c4daf6222a04f7ae80130495ea1",
        k2: "31bb1ee9a8d088f62b0103550c301449"
    },
    "TSN5": {
        name: "TSN 5 CA",
        url: "https://ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/dash/enc/mttgh1c4ei/out/v1/9cc664b146744e2ba23066aa048efbc5/cenc.mpd",
        k1: "8ce20e2a4b3dd04e0a6e5469b7cb47be",
        k2: "163c323b65d0597b13f037641fd67b1e"
    },
    "ITALIA1": {
        name: "ITALIA 1",
        url: "https://live03p-seg.msf.cdn.mediaset.net/live/ch-i1/i1-dash-widevine.isml/manifest.mpd",
        k1: "00f9f3c0783536b8ee91704e23b78016",
        k2: "bfd04d6f544c9cc4d35cb13ab6778587"
    },
    "LALIGATVUK": {
        name: "LaLiga TV UK",
        url: "https://ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/clients/dash/enc/k0duzgfejg/out/v1/70a50b1bda944628b8e7e66ab4069419/cenc.mpd",
        k1: "620e51b82596475517a27aa425c52280",
        k2: "2b9ba811e9c5aeafc8ae1b71cdca4d6a"
    },
    "ADN40": {
        name: "ADN 40",
        url: "https://mdstrm.com/live-stream-playlist/60b578b060947317de7b57ac.m3u8"
    },
    "AZUNO": {
        name: "AZTECA UNO",
        url: "https://mdstrm.com/live-stream-playlist/609b243156cca108312822a6.m3u8"
    },
    "AZINT": {
        name: "AZTECA INTERNACIONAL",
        url: "https://azt-mun.otteravision.com/azt/mun/mun.m3u8"
    },
    "CANAL5MX2": {
        name: "Canal 5 MX Op2 *",
        url: "http://104.238.205.28:8989/278328_.m3u8"
    },
    "CANAL5MX3": {
        name: "Canal 5 MX Op3 *",
        url: "http://104.238.205.28:8989/278329_.m3u8"
    },
    "CANAL5MX4": {
        name: "Canal 5 MX Op4 *",
        url: "http://104.238.205.28:8989/278330_.m3u8"
    },
    "MILENIO": {
        name: "Milenio Noticias *",
        url: "http://104.238.205.28:8989/278351_.m3u8"
    },
    "MILENIO2": {
        name: "Milenio Noticias Op2 *",
        url: "http://104.238.205.28:8989/278352_.m3u8"
    },
    "CANAL6": {
        name: "Canal 6 (Multimedios) *",
        url: "http://104.238.205.28:8989/278355_.m3u8"
    },
    "NU9VE": {
        name: "NU9VE *",
        url: "http://104.238.205.28:8989/278360_.m3u8"
    },
    "TELEFORMULA": {
        name: "TELEFORMULA *",
        url: "http://104.238.205.28:8989/278362_.m3u8"
    },
    "TELEFORMULA2": {
        name: "TELEFORMULA Op2 *",
        url: "http://104.238.205.28:8989/278363_.m3u8"
    },
    "CANAL4PUEBLA": {
        name: "Canal 4 (Puebla) *",
        url: "http://104.238.205.28:8989/278364_.m3u8"
    },
    "CANAL4PUEBLA2": {
        name: "Canal 4 (Puebla) Op2 *",
        url: "http://104.238.205.28:8989/278365_.m3u8"
    },
    "TLNOVELAS": {
        name: "TLNovelas *",
        url: "http://104.238.205.28:8989/278368_.m3u8"
    },
    "TLNOVELAS2": {
        name: "TLNovelas Op2 *",
        url: "http://104.238.205.28:8989/278369_.m3u8"
    },
    "TVUNAM": {
        name: "TV UNAM *",
        url: "http://104.238.205.28:8989/278370_.m3u8"
    },
    "MEGANOTICIAS": {
        name: "Meganoticias *",
        url: "http://104.238.205.28:8989/278371_.m3u8"
    },
    "TVPMX": {
        name: "TVP MX (Culiacan) *",
        url: "http://104.238.205.28:8989/278372_.m3u8"
    },
    "TVPMX2": {
        name: "TVP MX (Mochis) *",
        url: "http://104.238.205.28:8989/278373_.m3u8"
    },
    "TVPMX3": {
        name: "TVP MX (Obregon) *",
        url: "http://104.238.205.28:8989/278374_.m3u8"
    },
    "TVT": {
        name: "Television Tavasqueña *",
        url: "http://104.238.205.28:8989/278375_.m3u8"
    },
    "CANAL28": {
        name: "Canal 28 Nuevo Leon *",
        url: "http://104.238.205.28:8989/278376_.m3u8"
    },
    "RT": {
        name: "RT *",
        url: "http://104.238.205.28:8989/278377_.m3u8"
    },
    "TELEMAX": {
        name: "Telemax *",
        url: "http://104.238.205.28:8989/278378_.m3u8"
    },
    "TVPMX4": {
        name: "TVP MX (Mazatlan) Op2 *",
        url: "http://104.238.205.28:8989/278379_.m3u8"
    },
    "TVPMA": {
        name: "TVP MX (Mazatlan)",
        url: "https://5ca3e84a76d30.streamlock.net/gpacifico4/smil:mazatlan.smil/playlist.m3u8"
    },
    "TVPMO": {
        name: "TVP MX (Mochis)",
        url: "https://5ca3e84a76d30.streamlock.net/gpacifico2/smil:mochis.smil/playlist.m3u8"
    },
    "TVPC": {
        name: "TVP MX (Culiacan)",
        url: "https://5ca3e84a76d30.streamlock.net/gpacifico1/smil:gpculiacan.smil/playlist.m3u8"
    },
    "TVPO": {
        name: "TVP MX (Obregon)",
        url: "https://5ca3e84a76d30.streamlock.net/gpacifico3/smil:obregon.smil/playlist.m3u8"
    },
    "CANAL62": {
        name: "Canal 6 (Multimedios) Op2 *",
        url: "http://104.238.205.28:8989/278380_.m3u8"
    },
    "CANAL63": {
        name: "Canal 6 (Multimedios) Op3 *",
        url: "http://104.238.205.28:8989/278381_.m3u8"
    },
    "CANAL64": {
        name: "Canal 6 (Multimedios) Op4 *",
        url: "http://104.238.205.28:8989/278382_.m3u8"
    },
    "CANAL65": {
        name: "Canal 6 (Multimedios) Op5 *",
        url: "http://104.238.205.28:8989/278383_.m3u8"
    },
    "SKYSF": {
        name: "SKY Sports Football UK *",
        url: "http://178.33.239.54:8080/500a/index.m3u8"
    },
    "SKYSN": {
        name: "SKY Sports News UK *",
        url: "http://178.33.239.54:8080/501a/index.m3u8"
    },
    "SKYSME": {
        name: "SKY Sports Main Event UK *",
        url: "http://178.33.239.54:8080/502a/index.m3u8"
    },
    "SKYSC": {
        name: "SKY Sports Cricket UK *",
        url: "http://178.33.239.54:8080/503a/index.m3u8"
    },
    "SKYSA": {
        name: "SKY Sports Action UK *",
        url: "http://178.33.239.54:8080/504a/index.m3u8"
    },
    "SKYSPL": {
        name: "SKY Sports Premier League UK *",
        url: "http://178.33.239.54:8080/506a/index.m3u8"
    },
    "SKYSMI": {
        name: "SKY Sports Mix UK *",
        url: "http://178.33.239.54:8080/507a/index.m3u8"
    },
    "SKYSF1": {
        name: "SKY Sports F1 UK *",
        url: "http://178.33.239.54:8080/508a/index.m3u8"
    },
    "TNTS1": {
        name: "TNT SPORTS 1 UK *",
        url: "http://178.33.239.54:8080/509a/index.m3u8"
    },
    "TNTS2": {
        name: "TNT SPORTS 2 UK *",
        url: "http://178.33.239.54:8080/510a/index.m3u8"
    },
    "TNTS3": {
        name: "TNT SPORTS 3 UK *",
        url: "http://178.33.239.54:8080/511a/index.m3u8"
    },
    "TNTS4": {
        name: "TNT SPORTS 4 UK *",
        url: "http://178.33.239.54:8080/512a/index.m3u8"
    },
};
