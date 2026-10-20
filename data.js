/* =====================================================================
   EXPOCREDIT KNOWLEDGE CENTER — DATOS POR PAÍS
   ---------------------------------------------------------------------
   Para actualizar un país (o agregar uno nuevo) SOLO edita este archivo.
   No hay que tocar app.js: todas las pantallas se generan desde aquí.

   Estructura de cada país dentro de COUNTRIES:
     flag         Emoji de bandera
     name         Nombre que se muestra
     idDocs       (opcional) Filas de la tabla del Bloque 2: [[etiqueta, documento], ...]
     fiscal       { doc, obs }  Fila del Bloque 4 (Situación fiscal). Acepta HTML (<b>).
     antecedentes Texto del Bloque 6. Los países con texto idéntico se agrupan solos.
     clientes     { docs:[...], note:'...' }  Tarjeta de Requisitos por País > Clientes
     brokers      { docs:[...], note:'...' }  Tarjeta de Requisitos por País > Brokers
     checklist    Ítems ESPECÍFICOS del país: [[id, título, descripción], ...]
                  (el id debe ser único en todo el archivo)
     checklistNote (opcional) Nota que se muestra bajo los requisitos específicos.
     critical     { label, text }  Alerta de la tarjeta resumen al elegir el país
                  (label = punto crítico corto, ej. 'SAT'; text = explicación).

   El orden de las claves define el orden en pantalla.
   ===================================================================== */

/* Requisitos generales: siempre visibles en el checklist, sin importar el país */
const GENERAL_CHECKLIST = [
  ['acta',   'Acta vigente', 'Documento más reciente con composición accionaria, Junta Directiva, designación y poderes de Dominio del RL.'],
  ['inc',    'Actas de incorporación (si aplica)', 'Actas de incorporación de accionistas personas jurídicas.'],
  ['ids',    'Documentos de identidad', 'Del Representante Legal, accionistas ≥10% y principales administradores (si aplica).'],
  ['od',     'Ownership Declaration (OD) diligenciado y firmado', 'Para accionistas con participación mayor o igual al 10% (≥10%), con información consistente con el acta.'],
  ['chain',  'Cadena de propiedad hasta identificar el UBO', 'ODs adicionales para cada nivel de la cadena de propiedad hasta llegar al UBO.'],
  ['fiscal', 'Documentación de situación fiscal correspondiente al país', 'Según el país del prospecto; el detalle aparece en los requisitos específicos.']
];

/* Nota que aparece debajo del checklist cuando llega al 100% */
const CHECKLIST_DONE_NOTE = '<b>Nota:</b> Aun cuando se haya completado la totalidad del checklist, podrían surgir requerimientos adicionales dependiendo de los hallazgos, particularidades o situaciones identificadas durante el proceso de due diligence.';

/* Tarjeta "Todos los países" de la pestaña Brokers */
const BROKERS_GENERAL = {
  flag: '🌎', name: 'Todos los países',
  docs: ['Vendor Form completo y firmado', 'Formato W aplicable: W-8BEN / W-8BEN-E / W-9', 'Identificación oficial del broker'],
  note: 'Si el broker es persona jurídica, solicitar evidencia societaria e identificación del Representante Legal.'
};

/* Texto reutilizado para países donde el antecedente penal se pide al prospecto */
const ANTECEDENTES_AL_PROSPECTO = 'Los antecedentes penales se solicitan directamente al prospecto. El BDO debe informar al cliente que este documento será requerido y asegurarse de que sea entregado de manera oportuna para no retrasar el proceso.';

const COUNTRIES = {

  mx: {
    flag: '🇲🇽', name: 'México',
    idDocs: [['México', 'INE / IFE (credencial para votar vigente)']],
    fiscal: {
      doc: 'Constancia de Situación Fiscal de los accionistas con participación mayor o igual al 10% (≥10%) + Opinión de Cumplimiento (SAT)',
      obs: '<b>NO enviar estos documentos del prospecto.</b> ExpoCredit los descarga directamente desde Ekatena/SAT. <b>Se requieren únicamente los documentos del RL y de los accionistas con participación ≥ 10% listados en el OD.</b>'
    },
    antecedentes: 'ExpoCredit tiene acceso directo al Bureau de Incidencias Legales. No se requiere ningún documento ni gestión por parte del BDO en este rubro.',
    clientes: {
      docs: [
        'Constancia de Situación Fiscal de los accionistas con participación mayor o igual al 10% (≥10%) + Opinión de Cumplimiento (SAT)',
        'Documentos del RL y de los accionistas con participación ≥10% listados en el OD',
        'Poderes de Dominio del Representante Legal'
      ],
      note: 'NO enviar estos documentos del prospecto: ExpoCredit los descarga directamente desde Ekatena/SAT. Se requieren únicamente los documentos del RL y de los accionistas con participación ≥10% listados en el OD. Antecedentes: ExpoCredit consulta directamente el Bureau de Incidencias Legales.'
    },
    brokers: {
      docs: ['Documentación fiscal / tributaria aplicable', 'Identificación del broker / RL cuando corresponda'],
      note: 'Aplicar los requisitos que correspondan al tipo de broker y a su condición fiscal.'
    },
    checklist: [
      ['mx_csf', 'Constancia de Situación Fiscal', 'Constancia de Situación Fiscal (descargada por ExpoCredit desde Ekatena/SAT).'],
      ['mx_op',  'Opinión de Cumplimiento (SAT)', 'Descargada por ExpoCredit desde Ekatena/SAT.'],
      ['mx_rl',  'Documentos del Representante Legal', 'Documentos del RL listados en el OD.'],
      ['mx_acc', 'Documentos de accionistas con participación ≥10%', 'Documentos de los accionistas ≥10% listados en el OD.'],
      ['mx_pod', 'Poderes de Dominio del Representante Legal', 'Poderes de Dominio vigentes y expresos del RL en el acta.']
    ],
    checklistNote: 'La Constancia de Situación Fiscal y la Opinión de Cumplimiento son descargadas por ExpoCredit desde Ekatena/SAT y <b>no deben solicitarse al prospecto</b>.',
    critical: { label: 'SAT', text: 'No solicites al prospecto la Constancia de Situación Fiscal ni la Opinión de Cumplimiento: ExpoCredit las descarga desde Ekatena/SAT. Verifica los Poderes de Dominio del RL.' }
  },

  pe: {
    flag: '🇵🇪', name: 'Perú',
    idDocs: [['Perú', 'DNI (Documento Nacional de Identidad)']],
    fiscal: {
      doc: 'Reporte Tributario (SUNAT)',
      obs: 'Equivalente a la Opinión de Cumplimiento en México. Requerido para el prospecto.'
    },
    antecedentes: 'El BDO debe asegurarse de que el prospecto, sus accionistas (≥ 10%) y el RL firmen las Declaraciones Juradas desde el inicio del proceso. Estos documentos son indispensables para que ExpoCredit pueda gestionar internamente la solicitud de antecedentes penales y reportes de crédito. Sin las Declaraciones Juradas firmadas, no es posible avanzar en el proceso.',
    clientes: {
      docs: [
        'Reporte Tributario (SUNAT)',
        'Ficha RUC',
        'Declaración Jurada firmada por el prospecto, los accionistas ≥10% y el RL',
        'Si es cooperativa: listado de asociados'
      ],
      note: 'El Reporte Tributario (SUNAT) es equivalente a la Opinión de Cumplimiento en México y es requerido para el prospecto. Las Declaraciones Juradas son indispensables para que ExpoCredit gestione internamente antecedentes penales y reportes de crédito; sin ellas no es posible avanzar.'
    },
    brokers: {
      docs: ['Ficha RUC', 'Documentación tributaria aplicable'],
      note: 'Completar requisitos adicionales según el tipo de broker y lo solicitado por Compliance.'
    },
    checklist: [
      ['pe_rt',   'Reporte Tributario (SUNAT)', 'Reporte Tributario del prospecto (equivalente a la Opinión de Cumplimiento en México).'],
      ['pe_dj',   'Declaración Jurada firmada', 'Firmada para la consulta de reportes de crédito y antecedentes penales (prospecto, accionistas ≥10% y RL).'],
      ['pe_ruc',  'Ficha RUC', 'Ficha RUC del prospecto.'],
      ['pe_coop', 'Listado de asociados (solo si es cooperativa)', 'Aplica únicamente si el prospecto es una cooperativa.']
    ],
    critical: { label: 'Declaración Jurada', text: 'Sin las Declaraciones Juradas firmadas no es posible avanzar: ExpoCredit las necesita para gestionar antecedentes penales y reportes de crédito.' }
  },

  ec: {
    flag: '🇪🇨', name: 'Ecuador',
    idDocs: [['Ecuador', 'Cédula de Identidad']],
    fiscal: {
      doc: 'Certificado de Cumplimiento Tributario (SRI), que acredita que el contribuyente está al día con todas sus obligaciones fiscales.',
      obs: 'Requerido para el prospecto.'
    },
    antecedentes: ANTECEDENTES_AL_PROSPECTO,
    clientes: {
      docs: ['Certificado de Cumplimiento Tributario (SRI)', 'Antecedentes penales del RL y de los accionistas ≥10%'],
      note: 'El certificado acredita que el contribuyente está al día con todas sus obligaciones fiscales y es requerido para el prospecto. Los antecedentes penales se solicitan directamente al prospecto.'
    },
    brokers: {
      docs: ['Documentación fiscal aplicable', 'Evidencia societaria si es empresa'],
      note: 'Validar según el tipo de entidad.'
    },
    checklist: [
      ['ec_sri',   'Certificado de Cumplimiento Tributario (SRI)', 'Certificado del prospecto que acredita que está al día con sus obligaciones fiscales.'],
      ['ec_penal', 'Antecedentes penales', 'Antecedentes penales del RL y de los accionistas ≥10%, solicitados al prospecto.']
    ],
    critical: { label: 'SRI', text: 'Certificado de Cumplimiento Tributario del prospecto y antecedentes penales solicitados al cliente.' }
  },

  cl: {
    flag: '🇨🇱', name: 'Chile',
    idDocs: [['Chile', 'Cédula de Identidad']],
    fiscal: {
      doc: 'Certificado de Situación Tributaria (SII), que acredita si el contribuyente tiene deudas, declaraciones pendientes o sanciones.',
      obs: 'Requerido para el prospecto.'
    },
    antecedentes: ANTECEDENTES_AL_PROSPECTO,
    clientes: {
      docs: ['Certificado de Situación Tributaria (SII)', 'Antecedentes penales del RL y de los accionistas ≥10%'],
      note: 'Acredita si el contribuyente tiene deudas, declaraciones pendientes o sanciones. Requerido para el prospecto. Los antecedentes penales se solicitan directamente al prospecto.'
    },
    brokers: {
      docs: ['Documentación fiscal aplicable', 'Evidencia societaria si es empresa'],
      note: 'Validar según el tipo de entidad.'
    },
    checklist: [
      ['cl_sii', 'Certificado de Situación Tributaria (SII)', 'Certificado del prospecto que acredita su situación tributaria.']
    ],
    critical: { label: 'SII', text: 'Certificado de Situación Tributaria (SII) del prospecto: acredita deudas, declaraciones pendientes o sanciones.' }
  },

  cr: {
    flag: '🇨🇷', name: 'Costa Rica',
    idDocs: [['Costa Rica', 'Cédula de Identidad']],
    fiscal: {
      doc: 'Constancia de Situación Tributaria (Ministerio de Hacienda / TRIBU-CR), que certifica si el contribuyente está al día o tiene deudas con Hacienda.',
      obs: 'Requerido para el prospecto.'
    },
    antecedentes: ANTECEDENTES_AL_PROSPECTO,
    clientes: {
      docs: ['Constancia de Situación Tributaria (Ministerio de Hacienda / TRIBU-CR)', 'Antecedentes penales del RL y de los accionistas ≥10%'],
      note: 'Certifica si el contribuyente está al día o tiene deudas con Hacienda. Requerido para el prospecto. Los antecedentes penales se solicitan directamente al prospecto.'
    },
    brokers: {
      docs: ['Documentación fiscal aplicable', 'Evidencia societaria si es empresa'],
      note: 'Validar según el tipo de entidad.'
    },
    checklist: [
      ['cr_tribu', 'Constancia de Situación Tributaria (TRIBU-CR)', 'Constancia del prospecto emitida por el Ministerio de Hacienda.'],
      ['cr_penal', 'Antecedentes penales', 'Antecedentes penales del RL y de los accionistas ≥10%, solicitados al prospecto.']
    ],
    critical: { label: 'TRIBU-CR', text: 'Constancia de Situación Tributaria del Ministerio de Hacienda y antecedentes penales solicitados al cliente.' }
  },

  co: {
    flag: '🇨🇴', name: 'Colombia',
    idDocs: [['Colombia', 'Cédula de Ciudadanía']],
    fiscal: {
      doc: 'RUT / documentación tributaria aplicable',
      obs: 'Requerido para el prospecto.'
    },
    antecedentes: ANTECEDENTES_AL_PROSPECTO,
    clientes: {
      docs: ['RUT / documentación tributaria aplicable', 'Antecedentes penales del RL y de los accionistas ≥10%'],
      note: 'Consultar requisitos específicos del expediente según el caso. Los antecedentes penales se solicitan directamente al prospecto.'
    },
    brokers: {
      docs: ['RUT / documentación fiscal aplicable', 'Evidencia societaria si es empresa'],
      note: 'Validar según el tipo de entidad.'
    },
    checklist: [
      ['co_rut',   'RUT / documentación tributaria', 'RUT y documentación tributaria aplicable del prospecto.'],
      ['co_penal', 'Antecedentes penales', 'Antecedentes penales del RL y de los accionistas ≥10%, solicitados al prospecto.']
    ],
    critical: { label: 'RUT', text: 'RUT y documentación tributaria aplicable. Confirma con Compliance los requisitos específicos del caso.' }
  },

  us: {
    flag: '🇺🇸', name: 'Estados Unidos',
    fiscal: {
      doc: 'Tax Return del último año disponible',
      obs: 'Acompañado del Record Release Form y la autorización de consultas de crédito.'
    },
    antecedentes: 'Se gestionan con el Record Release Form y la autorización de consultas de crédito debidamente firmados.',
    clientes: {
      docs: [
        'Tax Return del último año disponible',
        'Release Form (cuando existan accionistas, UBOs o Representantes Legales en Estados Unidos)',
        'Autorización para consultas de crédito',
        'Documentación adicional cuando el caso lo requiera'
      ],
      note: 'Documentación aplicable según el perfil y alcance de Compliance.'
    },
    brokers: {
      docs: ['W-9 para US persons / US entities', 'W-8BEN para individuo extranjero', 'W-8BEN-E para empresa extranjera'],
      note: 'El formato W depende de la condición fiscal del broker.'
    },
    checklist: [
      ['us_tax',     'Tax Return del último año disponible', 'Tax Return del último año disponible.'],
      ['us_release', 'Release Form', 'Cuando existan accionistas, UBOs o Representantes Legales en Estados Unidos.'],
      ['us_credit',  'Autorización para consultas de crédito', 'Autorización firmada para realizar consultas de crédito.'],
      ['us_extra',   'Documentación adicional cuando el caso lo requiera', 'Según los hallazgos o particularidades del caso, a solicitud de Compliance.']
    ],
    critical: { label: 'Release Form', text: 'El Release Form aplica cuando existan accionistas, UBOs o Representantes Legales en Estados Unidos. Incluye también la autorización para consultas de crédito.' }
  },

  otros: {
    flag: '🌎', name: 'Panamá y otros países',
    idDocs: [
      ['Panamá', 'Cédula de Identidad Nacional'],
      ['Otros países', 'Pasaporte vigente o documento de identidad oficial con fotografía']
    ],
    antecedentes: ANTECEDENTES_AL_PROSPECTO,
    clientes: {
      docs: ['Antecedentes penales del RL y de los accionistas ≥10%', 'Documentación tributaria según el país'],
      note: 'Confirmar con Compliance los requisitos fiscales específicos de la jurisdicción antes de enviar el expediente.'
    },
    checklist: [
      ['ot_fiscal', 'Documentación tributaria del país', 'Documentos de situación fiscal según la jurisdicción (confirmar con Compliance).'],
      ['ot_penal',  'Antecedentes penales', 'Antecedentes penales del RL y de los accionistas ≥10%, solicitados al prospecto.']
    ],
    critical: { label: 'Confirmar con Compliance', text: 'Confirma los requisitos fiscales específicos de la jurisdicción antes de enviar el expediente.' }
  }
};
