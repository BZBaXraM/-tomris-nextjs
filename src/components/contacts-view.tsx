"use client";
import { useRef, useState, type FormEvent } from "react";
import { useLanguage } from "./language-provider";
import { PosterHeader } from "./poster-header";
import { prefersReducedMotion } from "@/lib/motion";
export function ContactsView() {
  const { c } = useLanguage();
  const [values, setValues] = useState({
    name: "",
    email: "",
    brand: "",
    service: "",
    message: "",
  });
  const [prepared, setPrepared] = useState(false);
  const [status, setStatus] = useState("");
  const result = useRef<HTMLDivElement>(null);
  const brief = `TOMRIS / ${c.contactLabel}\n\n${c.fields[0]}: ${values.name}\n${c.fields[1]}: ${values.email}\n${c.fields[2]}: ${values.brand || "—"}\n${c.fields[3]}: ${values.service !== "" ? c.serviceNames[Number(values.service)] : "—"}\n\n${c.fields[4]}:\n${values.message}`;
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPrepared(true);
    setStatus("");
    requestAnimationFrame(() =>
      result.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? "instant" : "smooth",
        block: "nearest",
      }),
    );
  }
  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setStatus(c.copied);
    } catch {
      setStatus(c.copyFail);
    }
  }
  function downloadBrief() {
    const url = URL.createObjectURL(
      new Blob([brief], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "TOMRIS-brief.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <PosterHeader index={3} />
      <section className="contact-layout">
        <div className="contact-info" data-reveal="up">
          <span className="section-index">{c.contactLabel}</span>
          <h2>{c.contactHeading}</h2>
          <p>{c.contactText}</p>
          <div className="contact-meta">
            {c.location}
            <p>{c.remote}</p>
          </div>
        </div>
        <form className="brief-form" onSubmit={prepare}>
          <div className="field" data-reveal="up">
            <label htmlFor="name">{c.fields[0]} *</label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              value={values.name}
              onChange={(event) =>
                setValues({ ...values, name: event.target.value })
              }
            />
          </div>
          <div className="field" data-reveal="up" data-delay="1">
            <label htmlFor="email">{c.fields[1]} *</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={200}
              value={values.email}
              onChange={(event) =>
                setValues({ ...values, email: event.target.value })
              }
            />
          </div>
          <div className="field" data-reveal="up" data-delay="1">
            <label htmlFor="brand">{c.fields[2]}</label>
            <input
              id="brand"
              name="brand"
              autoComplete="organization"
              maxLength={150}
              value={values.brand}
              onChange={(event) =>
                setValues({ ...values, brand: event.target.value })
              }
            />
          </div>
          <div className="field" data-reveal="up" data-delay="2">
            <label htmlFor="service">{c.fields[3]}</label>
            <select
              id="service"
              name="service"
              value={values.service}
              onChange={(event) =>
                setValues({ ...values, service: event.target.value })
              }
            >
              <option value="">{c.choose}</option>
              {c.serviceNames.map((name, i) => (
                <option key={name} value={i}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="field full" data-reveal="up" data-delay="2">
            <label htmlFor="message">{c.fields[4]} *</label>
            <textarea
              id="message"
              name="message"
              required
              maxLength={5000}
              placeholder={c.placeholder}
              value={values.message}
              onChange={(event) =>
                setValues({ ...values, message: event.target.value })
              }
            />
          </div>
          <div className="form-actions" data-reveal="up" data-delay="3">
            <button className="solid-button" type="submit">
              {c.prepare}
            </button>
          </div>
          <p className="form-note">{c.formNote}</p>
          {prepared && (
            <div className="brief-result" ref={result} data-reveal="up">
              <h3>{c.briefReady}</h3>
              <pre>{brief}</pre>
              <div className="actions">
                <button type="button" onClick={copyBrief}>
                  {c.copy}
                </button>
                <button type="button" onClick={downloadBrief}>
                  {c.download}
                </button>
              </div>
              <p role="status">{status}</p>
            </div>
          )}
        </form>
      </section>
    </>
  );
}
