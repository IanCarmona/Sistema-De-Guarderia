

// const validate = require('validate');

// const form = document.querySelector('form');

// form.addEventListener('submit', function (event) {
//     event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

//     const formData = new FormData(form);

//     const constraints = {
//         name: {
//             presence: true,
//             length: {
//                 minimum: 3,
//                 maximum: 20,
//                 message: "debe tener entre 3 y 20 caracteres"
//             }
//         },
//         email: {    
//             presence: true,
//             email: true
//         },
//         password: {
//             presence: true,
//             length: {
//                 minimum: 6,
//                 message: "debe tener al menos 6 caracteres"
//             }
//         }
//     };

//     const errors = validate(formData, constraints);

//     if (errors) {
//         // Si hay errores de validación, muestra los mensajes de error en el formulario
//         displayErrors(errors);
//     } else {
//         // Los datos son válidos, puedes enviar el formulario o realizar cualquier acción adicional
//         form.submit();
//     }
// });

// function displayErrors(errors) {
//     const errorContainer = document.querySelector('.error-container');

//     // Limpia los mensajes de error anteriores
//     errorContainer.innerHTML = '';

//     // Recorre los errores y los muestra en el formulario
//     Object.keys(errors).forEach(function (field) {
//         errors[field].forEach(function (message) {
//             const errorElement = document.createElement('p');
//             errorElement.textContent = message;
//             errorContainer.appendChild(errorElement);
//         });
//     });
// }
