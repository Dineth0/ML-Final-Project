/**
 * WATER_PARAMS — metadata for each input field.
 */
export const WATER_PARAMS = [
  {
    key: 'ph',
    label: 'pH Level',
    unit: 'pH',
    placeholder: '7.0',
    hint: 'Range: 0 – 14',
    description: 'Acidity or alkalinity of water. WHO safe range: 6.5 – 8.5',
    min: 0,
    max: 14,
    step: 0.01,
    icon: '⚗️',
  },
  {
    key: 'Hardness',
    label: 'Hardness',
    unit: 'mg/L',
    placeholder: '196.96',
    hint: 'Typical: 100 – 300 mg/L',
    description: 'Calcium & magnesium mineral content in water.',
    min: 0,
    max: 600,
    step: 0.01,
    icon: '🪨',
  },
  {
    key: 'Solids',
    label: 'Total Dissolved Solids',
    unit: 'ppm',
    placeholder: '20791.0',
    hint: 'Typical: 500 – 50 000 ppm',
    description: 'Total concentration of dissolved substances.',
    min: 0,
    max: 60000,
    step: 0.1,
    icon: '🧂',
  },
  {
    key: 'Chloramines',
    label: 'Chloramines',
    unit: 'ppm',
    placeholder: '7.3',
    hint: 'WHO limit: ≤ 4 ppm',
    description: 'Disinfectant used in water treatment.',
    min: 0,
    max: 14,
    step: 0.01,
    icon: '🧪',
  },
  {
    key: 'Sulfate',
    label: 'Sulfate',
    unit: 'mg/L',
    placeholder: '368.52',
    hint: 'WHO guideline: < 500 mg/L',
    description: 'Naturally occurring sulfate concentration.',
    min: 0,
    max: 1000,
    step: 0.01,
    icon: '⛽',
  },
  {
    key: 'Conductivity',
    label: 'Conductivity',
    unit: 'μS/cm',
    placeholder: '564.31',
    hint: 'WHO limit: < 400 μS/cm',
    description: 'Electrical conductivity indicating dissolved ions.',
    min: 0,
    max: 1500,
    step: 0.01,
    icon: '⚡',
  },
  {
    key: 'Organic_carbon',
    label: 'Organic Carbon',
    unit: 'ppm',
    placeholder: '10.38',
    hint: 'Typical: 2 – 20 ppm',
    description: 'Total organic carbon from natural & synthetic sources.',
    min: 0,
    max: 30,
    step: 0.01,
    icon: '🌿',
  },
  {
    key: 'Trihalomethanes',
    label: 'Trihalomethanes',
    unit: 'μg/L',
    placeholder: '86.99',
    hint: 'WHO limit: ≤ 80 μg/L',
    description: 'Disinfection byproducts formed during chlorination.',
    min: 0,
    max: 130,
    step: 0.01,
    icon: '☢️',
  },
  {
    key: 'Turbidity',
    label: 'Turbidity',
    unit: 'NTU',
    placeholder: '3.99',
    hint: 'WHO limit: < 4 NTU',
    description: 'Cloudiness of water caused by suspended particles.',
    min: 0,
    max: 10,
    step: 0.01,
    icon: '🌊',
  },
]

export const INITIAL_VALUES = Object.fromEntries(
  WATER_PARAMS.map((p) => [p.key, ''])
)

/**
 * SAFE_RANGES — WHO / standard safe thresholds per parameter.
 * Used by ResultCard to highlight out-of-range inputs.
 * Each entry: { min?, max?, label }
 */
export const SAFE_RANGES = {
  ph:               { min: 6.5,  max: 8.5,   label: '6.5 – 8.5 pH' },
  Hardness:         {            max: 300,    label: '< 300 mg/L' },
  Solids:           {            max: 50000,  label: '< 50 000 ppm' },
  Chloramines:      {            max: 4,      label: '≤ 4 ppm' },
  Sulfate:          {            max: 500,    label: '< 500 mg/L' },
  Conductivity:     {            max: 400,    label: '< 400 μS/cm' },
  Organic_carbon:   { min: 2,   max: 20,     label: '2 – 20 ppm' },
  Trihalomethanes:  {            max: 80,     label: '≤ 80 μg/L' },
  Turbidity:        {            max: 4,      label: '< 4 NTU' },
}

/**
 * RECOMMENDATIONS — tips keyed by parameter, shown when out of range.
 */
export const RECOMMENDATIONS = {
  ph:              'Adjust pH using lime (to raise) or acid dosing (to lower) until 6.5–8.5.',
  Hardness:        'Use water softeners or ion-exchange systems to reduce hardness.',
  Solids:          'Reverse osmosis or distillation can reduce dissolved solids effectively.',
  Chloramines:     'Use activated carbon filters to remove excess chloramines.',
  Sulfate:         'Ion exchange or reverse osmosis can remove excess sulfate.',
  Conductivity:    'High conductivity indicates excess ions — use RO or distillation.',
  Organic_carbon:  'Activated carbon filtration reduces organic carbon effectively.',
  Trihalomethanes: 'Aeration or activated carbon filters can reduce THM levels.',
  Turbidity:       'Coagulation, sedimentation, and sand filtration will lower turbidity.',
}
