// Configuración básica de i18next
i18next
  .init({
    fallbackLng: 'es', 
    debug: true, 
    resources: {
      es: {
        translation: {
          "CodeGenerator": {
            "title": "Generador de Códigos",
            "subtitle": "Pegue el texto o ingrese la URL",
            "generateBtn": "Generar código QR"
          }
        }
      },
      en: {
        translation: {
          "CodeGenerator": {
            "title": "QR Code Generator",
            "subtitle": "Paste the text or enter the URL",
            "generateBtn": "Generate QR Code"
          }
        }
      },
      pt: {
        translation: {
          "CodeGenerator": {
            "title": "Gerador de Códigos",
            "subtitle": "Cole o texto ou insira a URL",
            "generateBtn": "Gerar código QR"
          }
        }
      },
      fr: {
        translation: {
          "CodeGenerator": {
            "title": "Générateur de Codes",
            "subtitle": "Collez le texte ou saisissez l'URL",
            "generateBtn": "Générer le code QR"
          }
        }
      },
      nl: {
        translation: {
          "CodeGenerator": {
            "title": "QR-codegenerator",
            "subtitle": "Plak de tekst of voer de URL in",
            "generateBtn": "Genereer QR-code"
          }
        }
      }
    }
  })
  .then(() => {
    // Al cargar la página, inicializa las traducciones
    updateTranslations();
  });

// Función para cambiar el idioma al hacer clic en una bandera
document.querySelectorAll('.flag').forEach(flag => {
  flag.addEventListener('click', function() {
    const selectedLanguage = this.getAttribute('data-lang');
    i18next.changeLanguage(selectedLanguage);
    updateTranslations();
  });
});

// Función para actualizar las traducciones en la página
function updateTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = i18next.t(key);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const placeholderKey = element.dataset.i18nPlaceholder;
    const placeholderValue = i18next.t(placeholderKey);
    element.placeholder = placeholderValue;
  });

  // También actualizamos el texto del botón después de cambiar el idioma
  const generateBtn = document.querySelector('.generateBtn');
  generateBtn.textContent = i18next.t('CodeGenerator.generateBtn');
}

const wrapper = document.querySelector(".wrapper");
const qrInput = wrapper.querySelector("input");
const generateBtn = wrapper.querySelector("button");
let qrImg;

generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value.trim();
  if (!qrValue) return;
  wrapper.classList.add("active");
  generateQRCode(qrValue);
});

function generateQRCode(qrValue) {
  if (qrImg) {
    qrImg.remove(); // Eliminamos la imagen anterior si existe
  }

  // Creamos una imagen en el lienzo del navegador
  qrImg = new Image();
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;

  // Esperamos a que la imagen se cargue completamente
  qrImg.onload = function() {
    const qrCodeContainer = wrapper.querySelector(".qr-code");
    qrCodeContainer.innerHTML = "";

    // Agregamos la imagen al contenedor
    qrCodeContainer.appendChild(qrImg);
  };
}

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    if (qrImg) {
      qrImg.remove(); // Eliminamos la imagen del QR si existe
    }
  }
});
