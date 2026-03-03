import { useState } from "react";
import Card from "../components/Card";
import SliderInput from "../components/SliderInput";

export default function CloudTool({ t }) {
  const [vcpu,    setVcpu]    = useState(4);
  const [ram,     setRam]     = useState(16);
  const [storage, setStorage] = useState(100);
  const [hours,   setHours]   = useState(730);

  const providers = [
    { name: "AWS",   color: "#f59e0b", base: vcpu * 0.048 + ram * 0.006, storage: storage * 0.023  },
    { name: "GCP",   color: "#06b6d4", base: vcpu * 0.044 + ram * 0.006, storage: storage * 0.02   },
    { name: "Azure", color: "#3b82f6", base: vcpu * 0.05  + ram * 0.007, storage: storage * 0.0184 },
  ].map(p => ({ ...p, total: Math.round((p.base * hours + p.storage) * 150) }));
  const maxCost = Math.max(...providers.map(p => p.total));

  return (
    <div>
      <Card t={t} style={{ marginBottom: "1rem" }}>
        {providers.map(p => (
          <div key={p.name} style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
              <span style={{ fontSize: "0.85rem", color: p.color, fontWeight: 600 }}>{p.name}</span>
              <span style={{ fontFamily: "monospace", fontWeight: 700, color: t.text }}>
                ¥{p.total.toLocaleString()}<span style={{ fontSize: "0.65rem", color: t.muted }}>/月</span>
              </span>
            </div>
            <div style={{ height: 6, background: t.faint, borderRadius: 3 }}>
              <div style={{ height: "100%", width: `${(p.total / maxCost) * 100}%`, background: p.color, borderRadius: 3, transition: "width 0.4s" }} />
            </div>
          </div>
        ))}
        <p style={{ fontSize: "0.6rem", color: t.muted, margin: "0.5rem 0 0" }}>※ 概算値・為替150円換算</p>
      </Card>
      <Card t={t}>
        <SliderInput label="vCPU"         value={vcpu}    min={1}  max={32}   step={1}  unit="コア" onChange={setVcpu}    color="#06b6d4" t={t} />
        <SliderInput label="メモリ"       value={ram}     min={1}  max={128}  step={1}  unit="GB"  onChange={setRam}     color="#06b6d4" t={t} />
        <SliderInput label="ストレージ"   value={storage} min={10} max={2000} step={10} unit="GB"  onChange={setStorage} color="#06b6d4" t={t} />
        <SliderInput label="月間稼働時間" value={hours}   min={1}  max={730}  step={10} unit="h"   onChange={setHours}   color="#06b6d4" t={t} />
      </Card>
    </div>
  );
}
