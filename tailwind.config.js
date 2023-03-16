/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['SearchMeals.html', 'DetailIngredient.html', 'SearchIngredient.html'],
  theme: {
    extend: {
      colors: {
        primary:'#21243D',
        secondary1:'#F17228',
        secondary2:'#FFAE00',
        secondary3:'#FFB30E',
        secondary4:'#F17228',
        secondary5: '#504F4F',
        secondary6: '#353535',
        tombol1:'#FFB20E',
        tombol2: '#FFB800',
        tombol3: '#FF8A00',
        tombol4: '#F65900',
        tombol5: '#FF7A7A',
        warnaBg1: '#FEEFD0',
        WarnaBg2: '#FECB10',
        warnaBg3: '#FDEDCA',
        warnaLogo: '#F58D00'
      },
      fontFamily: {
        'SourceSansPro': ['SourceSansPro']
      },
      backgroundImage: {
        'hero-index': "url('img/bg-index.svg')",
      }
    },
  },
  plugins: [],
}
