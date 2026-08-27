/* =========================================================
   SATE-UCH
   Sistema de Alerta Temprana Estudiantil

   Prototipo académico.
   Todos los datos utilizados son ficticios.
   ========================================================= */


/* =========================================================
   NAVEGACIÓN
   ========================================================= */

function showSection(sectionId, button = null) {

    const sections =
        document.querySelectorAll(".section");


    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    const section =
        document.getElementById(sectionId);


    if (section) {

        section.classList.add(
            "active-section"
        );

    }


    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(item => {

        item.classList.remove("active");

    });


    if (button) {

        button.classList.add("active");

    } else {

        navItems.forEach(item => {

            const action =
                item.getAttribute("onclick");


            if (
                action &&
                action.includes(
                    `'${sectionId}'`
                )
            ) {

                item.classList.add("active");

            }

        });

    }


    if (window.innerWidth <= 800) {

        document
            .getElementById("sidebar")
            .classList.remove("open");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SIDEBAR
   ========================================================= */

function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList.toggle("open");

}


/* =========================================================
   DATOS DE ESTUDIANTES
   ========================================================= */

const students = {

    "Juan Carlos Pérez": {

        career:
            "Ingeniería de Sistemas · VII ciclo",

        risk:
            "ALTO",

        grade:
            "10.8",

        attendance:
            "68%",

        payments:
            "Al día",

        reasons: [

            "📉 Bajo rendimiento académico",

            "📅 Inasistencia elevada"

        ]

    },


    "María López García": {

        career:
            "Enfermería · IV ciclo",

        risk:
            "ALTO",

        grade:
            "11.4",

        attendance:
            "91%",

        payments:
            "2 pendientes",

        reasons: [

            "📉 Bajo rendimiento académico",

            "💳 Pagos pendientes"

        ]

    },


    "Andrea Ramírez": {

        career:
            "Administración · III ciclo",

        risk:
            "MEDIO",

        grade:
            "15.2",

        attendance:
            "79%",

        payments:
            "Al día",

        reasons: [

            "📅 Asistencia por debajo del umbral"

        ]

    },


    "Diego García": {

        career:
            "Ingeniería Electrónica · IX ciclo",

        risk:
            "MEDIO",

        grade:
            "14.8",

        attendance:
            "93%",

        payments:
            "1 pendiente",

        reasons: [

            "💳 Pago pendiente"

        ]

    }

};


/* =========================================================
   PERFIL DEL ESTUDIANTE
   ========================================================= */

function openStudent(name) {

    const student =
        students[name];


    if (!student) {

        return;

    }


    document.getElementById(
        "modalStudentName"
    ).textContent = name;


    document.getElementById(
        "modalStudentCareer"
    ).textContent =
        student.career;


    document.getElementById(
        "modalRisk"
    ).textContent =
        student.risk;


    document.getElementById(
        "modalGrade"
    ).textContent =
        student.grade;


    document.getElementById(
        "modalAttendance"
    ).textContent =
        student.attendance;


    document.getElementById(
        "modalPayments"
    ).textContent =
        student.payments;


    const reasons =
        document.getElementById(
            "modalReasons"
        );


    reasons.innerHTML = "";


    student.reasons.forEach(reason => {

        const span =
            document.createElement("span");


        span.textContent =
            reason;


        reasons.appendChild(span);

    });


    const modal =
        document.getElementById(
            "studentModal"
        );


    modal.classList.add("show");

}


/* =========================================================
   CERRAR PERFIL
   ========================================================= */

function closeStudent() {

    document
        .getElementById("studentModal")
        .classList.remove("show");

}


/* =========================================================
   CERRAR MODAL HACIENDO CLICK AFUERA
   ========================================================= */

document
    .getElementById("studentModal")
    .addEventListener(
        "click",
        function(event) {

            if (event.target === this) {

                closeStudent();

            }

        }
    );


/* =========================================================
   REGISTRAR INTERVENCIÓN
   ========================================================= */

function registerIntervention() {

    closeStudent();


    showNotification(
        "Intervención registrada correctamente"
    );


    setTimeout(() => {

        showSection("seguimiento");

    }, 500);

}


/* =========================================================
   BUSCADOR DE ESTUDIANTES
   ========================================================= */

function filterStudents() {

    const searchInput =
        document.getElementById(
            "studentSearch"
        );


    const filter =
        document.getElementById(
            "riskFilter"
        );


    if (!searchInput || !filter) {

        return;

    }


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const risk =
        filter.value;


    const rows =
        document.querySelectorAll(
            "#studentsTable tbody tr"
        );


    rows.forEach(row => {

        const text =
            row.textContent
                .toLowerCase();


        const rowRisk =
            row.dataset.risk;


        const matchesText =
            text.includes(search);


        const matchesRisk =
            risk === "all" ||
            rowRisk === risk;


        if (
            matchesText &&
            matchesRisk
        ) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}


/* =========================================================
   BUSCADOR GLOBAL
   ========================================================= */

function globalSearch() {

    const input =
        document.getElementById(
            "globalSearch"
        );


    if (!input) {

        return;

    }


    const search =
        input.value
            .toLowerCase()
            .trim();


    if (search.length < 2) {

        return;

    }


    let foundName = null;


    Object.keys(students).forEach(name => {

        const student =
            students[name];


        const completeText =
            (
                name +
                " " +
                student.career
            ).toLowerCase();


        if (
            completeText.includes(search)
        ) {

            foundName = name;

        }

    });


    if (foundName) {

        openStudent(foundName);

    }

}


/* =========================================================
   NOTIFICACIONES
   ========================================================= */

function showNotification(message) {

    const notification =
        document.createElement("div");


    notification.textContent =
        "✓ " + message;


    notification.style.position =
        "fixed";

    notification.style.right =
        "25px";

    notification.style.bottom =
        "25px";

    notification.style.background =
        "#111827";

    notification.style.color =
        "white";

    notification.style.padding =
        "12px 17px";

    notification.style.borderRadius =
        "8px";

    notification.style.fontSize =
        "10px";

    notification.style.fontWeight =
        "600";

    notification.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.2)";

    notification.style.zIndex =
        "9999";


    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        notification.style.opacity =
            "0";

        notification.style.transform =
            "translateY(10px)";

        notification.style.transition =
            ".3s";


        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 2500);

}


/* =========================================================
   GRÁFICO DE ALERTAS
   ========================================================= */

const riskCanvas =
    document.getElementById(
        "riskChart"
    );


if (riskCanvas) {

    new Chart(
        riskCanvas,
        {

            type: "line",

            data: {

                labels: [

                    "Mar",

                    "Abr",

                    "May",

                    "Jun",

                    "Jul",

                    "Ago"

                ],

                datasets: [

                    {

                        label:
                            "🔴 Alto",

                        data: [
                            24,
                            29,
                            27,
                            35,
                            31,
                            37
                        ],

                        borderColor:
                            "#dc2626",

                        backgroundColor:
                            "rgba(220,38,38,.05)",

                        fill: true,

                        tension: .4,

                        borderWidth: 2,

                        pointRadius: 3

                    },


                    {

                        label:
                            "🟡 Medio",

                        data: [
                            98,
                            110,
                            104,
                            127,
                            136,
                            143
                        ],

                        borderColor:
                            "#f59e0b",

                        backgroundColor:
                            "rgba(245,158,11,.03)",

                        fill: true,

                        tension: .4,

                        borderWidth: 2,

                        pointRadius: 3

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio:
                    false,

                interaction: {

                    intersect: false,

                    mode: "index"

                },

                plugins: {

                    legend: {

                        position:
                            "bottom",

                        labels: {

                            boxWidth: 9,

                            padding: 15,

                            font: {

                                size: 8

                            }

                        }

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true,

                        grid: {

                            color:
                                "#f3f4f6"

                        },

                        ticks: {

                            font: {

                                size: 8

                            }

                        }

                    },

                    x: {

                        grid: {

                            display: false

                        },

                        ticks: {

                            font: {

                                size: 8

                            }

                        }

                    }

                }

            }

        }

    );

}


/* =========================================================
   CÁLCULO DEL SEMÁFORO
   ========================================================= */

/*
   Esta función muestra la lógica principal
   del prototipo.

   Cada indicador negativo suma 1 punto.

   0 indicadores  = VERDE
   1 indicador    = AMARILLO
   2+ indicadores = ROJO
*/

function calculateRisk(
    grade,
    attendance,
    paymentPending
) {

    let indicators = 0;


    // Bajo rendimiento
    if (grade < 12) {

        indicators++;

    }


    // Baja asistencia
    if (attendance < 80) {

        indicators++;

    }


    // Pagos pendientes
    if (paymentPending === true) {

        indicators++;

    }


    if (indicators === 0) {

        return {

            level: "green",

            text: "ESTABLE",

            indicators: 0

        };

    }


    if (indicators === 1) {

        return {

            level: "yellow",

            text: "PRECAUCIÓN",

            indicators: 1

        };

    }


    return {

        level: "red",

        text: "PRIORIDAD",

        indicators: indicators

    };

}


/* =========================================================
   EJEMPLO DE CÁLCULO
   ========================================================= */

console.log(
    "Ejemplo de cálculo de riesgo:"
);


console.log(
    calculateRisk(
        10.8,
        68,
        false
    )
);


/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        showSection(
            "dashboard"
        );


        console.log(
            "SATE-UCH iniciado correctamente."
        );


        console.log(
            "Prototipo académico."
        );

    }
);
