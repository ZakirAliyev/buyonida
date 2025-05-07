import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Cookies from "js-cookie";
export default function Fingerprint() {
  const {
    t
  } = useTranslation();
  const [fingerprint, setFingerprint] = useState("");
  useEffect(() => {
    (async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
      Cookies.set("uniqueCode", result.visitorId);
    })();
  }, []);
  return <></>;
}