"use client";

import { useState, type FormEvent } from "react";

export default function PremiumContactForm() {
  const [note, setNote] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Consulta desde Supercoffee — ${name}`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || "No informado"}\n\nMensaje:\n${message}`
    );

    setNote("Abrimos tu aplicación de correo con el mensaje listo para enviar.");
    window.location.href = `mailto:hola@supercoffee.com.ar?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} data-reveal>
      <header>
        <span>Escribinos</span>
        <h3>Reservá tu pausa.</h3>
        <p>Contanos cuándo venís o qué necesitás. Te respondemos a la brevedad.</p>
      </header>

      <div className="contact-fields">
        <label className="form-field form-field-wide">
          <span>Nombre</span>
          <input name="name" type="text" autoComplete="name" placeholder="¿Cómo te llamás?" required />
        </label>
        <label className="form-field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" placeholder="nombre@email.com" required />
        </label>
        <label className="form-field">
          <span>Teléfono</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+54 9 11" />
        </label>
        <label className="form-field form-field-wide">
          <span>Mensaje</span>
          <textarea name="message" rows={3} placeholder="Quiero reservar una mesa para..." required />
        </label>
      </div>

      <div className="contact-submit">
        <p>Al enviar se abrirá tu aplicación de correo.</p>
        <button type="submit">Enviar consulta <span aria-hidden="true">↗</span></button>
      </div>
      <p className="contact-note" aria-live="polite">{note}</p>
    </form>
  );
}
