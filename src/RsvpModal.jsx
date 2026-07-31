import React, { useState } from 'react';

const RsvpModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    asistencia: '',
    pareja: '',
    hijos: '',
    restricciones: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.nombre || !formData.asistencia) {
        alert("Por favor, ingresá tu nombre y confirmá tu asistencia.");
        return;
      }
      
      if (formData.asistencia === 'Lamentablemente no podré asistir') {
        handleSubmit();
      } else if (formData.asistencia === 'Asistiré solo/a') {
        setStep(3); // Skip step 2 (acompañantes)
      } else {
        setStep(2); // Go to step 2 (acompañantes)
      }
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 3 && formData.asistencia === 'Asistiré solo/a') {
      setStep(1);
    } else {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const data = new FormData();
    data.append('Nombre y apellido completo', formData.nombre);
    data.append('¿Venís acompañado/a?', formData.asistencia);
    data.append('Nombre de la pareja', formData.pareja);
    data.append('Hijos que te acompañan', formData.hijos);
    data.append('Restricciones alimentarias', formData.restricciones);

    try {
      await fetch('https://script.google.com/macros/s/AKfycbwrDM5qec2lJQeF1pxa1uw_lSgANB-D3RymeY1bvGcuzrIEGclIe3dVVRvWRzxtqK4G/exec', {
        method: 'POST',
        body: data,
        mode: 'no-cors'
      });
      setStep(4); // Success step
    } catch (error) {
      alert("Hubo un error al enviar. Por favor intentá de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setFormData({ nombre: '', asistencia: '', pareja: '', hijos: '', restricciones: '' });
    onClose();
  };

  return (
    <div className="rsvp-modal-overlay">
      <div className="rsvp-modal-content">
        <button className="rsvp-close-btn" onClick={resetAndClose}>✕</button>
        
        {step === 1 && (
          <div className="rsvp-step fade-in-section">
            <h3 className="rsvp-title">Confirmar Asistencia</h3>
            
            <div className="rsvp-field">
              <label>Nombre y apellido completo *</label>
              <input 
                type="text" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                placeholder="Ej. Juan Pérez" 
              />
            </div>

            <div className="rsvp-field">
              <label>¿Venís acompañado/a? *</label>
              <div className="rsvp-radio-group">
                <label className={`rsvp-radio ${formData.asistencia === 'Asistiré solo/a' ? 'selected' : ''}`}>
                  <input type="radio" name="asistencia" value="Asistiré solo/a" onChange={handleChange} />
                  Asistiré solo/a
                </label>
                <label className={`rsvp-radio ${formData.asistencia === 'Asistiré acompañado/a' ? 'selected' : ''}`}>
                  <input type="radio" name="asistencia" value="Asistiré acompañado/a" onChange={handleChange} />
                  Asistiré acompañado/a
                </label>
                <label className={`rsvp-radio ${formData.asistencia === 'Lamentablemente no podré asistir' ? 'selected' : ''}`}>
                  <input type="radio" name="asistencia" value="Lamentablemente no podré asistir" onChange={handleChange} />
                  No podré asistir
                </label>
              </div>
            </div>

            <button className="rsvp-next-btn" onClick={handleNext}>Siguiente</button>
          </div>
        )}

        {step === 2 && (
          <div className="rsvp-step fade-in-section">
            <h3 className="rsvp-title">Acompañantes</h3>
            
            <div className="rsvp-field">
              <label>Nombre de la pareja (opcional)</label>
              <input 
                type="text" 
                name="pareja" 
                value={formData.pareja} 
                onChange={handleChange} 
                placeholder="Ej. María Gómez" 
              />
            </div>

            <div className="rsvp-field">
              <label>Hijos que te acompañan (opcional)</label>
              <textarea 
                name="hijos" 
                value={formData.hijos} 
                onChange={handleChange} 
                placeholder="Ej. Mateo 3 años, Sofía 1 año" 
                rows="2"
              ></textarea>
            </div>

            <div className="rsvp-buttons">
              <button className="rsvp-back-btn" onClick={handleBack}>Atrás</button>
              <button className="rsvp-next-btn" onClick={handleNext}>Siguiente</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="rsvp-step fade-in-section">
            <h3 className="rsvp-title">Restricciones</h3>
            
            <div className="rsvp-field">
              <label>Restricciones alimentarias (opcional)</label>
              <p className="rsvp-hint">¿Vos o alguno de tus acompañantes tiene alguna alergia, intolerancia o dieta especial?</p>
              <textarea 
                name="restricciones" 
                value={formData.restricciones} 
                onChange={handleChange} 
                placeholder="Ej. Soy celíaco/a, vegano/a..." 
                rows="3"
              ></textarea>
            </div>

            <div className="rsvp-buttons">
              <button className="rsvp-back-btn" onClick={handleBack}>Atrás</button>
              <button className="rsvp-submit-btn" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="rsvp-step fade-in-section rsvp-success">
            <h3 className="rsvp-title">¡Muchas gracias!</h3>
            <p className="rsvp-hint" style={{ fontSize: '1.2rem', marginTop: '10px' }}>Te esperamos para festejar juntos el primer añito de Luca. 🎂🎉</p>
            <button className="rsvp-next-btn" style={{ marginTop: '20px' }} onClick={resetAndClose}>Cerrar</button>
          </div>
        )}

      </div>
    </div>
  );
};

export default RsvpModal;
