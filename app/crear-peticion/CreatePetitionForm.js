export default function CreatePetitionForm() {
  return (
    <form
      method="post"
      action="/api/create-petition"
      encType="multipart/form-data"
      className="space-y-5"
    >
      <p className="text-xs text-muted">
        Los campos marcados con <span className="text-error">*</span> son obligatorios.
      </p>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Nombre de la petición <span className="text-error">*</span>
        </label>
        <input
          name="title"
          type="text"
          required
          placeholder="Ej: Arreglar baches en Calle Pleyades"
          className="w-full border border-border rounded-[8px] px-3 h-12 text-base focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Descripción <span className="text-error">*</span>
        </label>
        <textarea
          name="description"
          rows={4}
          required
          placeholder="Describe el problema y por qué es importante solucionarlo..."
          className="w-full border border-border rounded-[8px] px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand resize-none"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Ubicación <span className="text-error">*</span>
        </label>
        <input
          name="location"
          type="text"
          required
          placeholder="Ej: Aravaca, Madrid"
          className="w-full border border-border rounded-[8px] px-3 h-12 text-base focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Tu email <span className="text-error">*</span>
        </label>
        <input
          name="creator_email"
          type="email"
          required
          placeholder="tu@email.com"
          className="w-full border border-border rounded-[8px] px-3 h-12 text-base focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <p className="text-xs text-muted mt-1">
          Solo para confirmarte que tu petición está activa.
        </p>
      </div>

      {/* Goal */}
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Objetivo de firmas <span className="text-error">*</span>
        </label>
        <input
          name="goal_signatures"
          type="number"
          required
          min="10"
          max="100000"
          defaultValue={500}
          className="w-full border border-border rounded-[8px] px-3 h-12 text-base focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <p className="text-xs text-muted mt-1">
          ¿Cuántas firmas necesitas para presionar al Ayuntamiento?
        </p>
      </div>

      {/* Photos */}
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Fotos del problema{' '}
          <span className="text-muted font-normal">(opcional, máximo 3)</span>
        </label>
        <input
          name="images"
          type="file"
          accept="image/*"
          multiple
          className="w-full text-sm text-muted file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand file:text-white hover:file:bg-brand-light cursor-pointer"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-cta hover:bg-cta-hover text-white text-base font-semibold rounded-[10px] h-[52px] transition-colors cursor-pointer"
      >
        Continuar al pago →
      </button>

      <p className="text-xs text-muted text-center">
        Pago seguro con tarjeta a través de Stripe.
      </p>
    </form>
  )
}
