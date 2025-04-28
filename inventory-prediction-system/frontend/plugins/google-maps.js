import { Loader } from '@googlemaps/js-api-loader';

export default defineNuxtPlugin(() => {
  const loader = new Loader({
    apiKey: 'AIzaSyAcPzKC8f1ZfTZyaMdeNJk8wdKGPYe3wlg', // Replace with your API Key
    libraries: ['core','maps','places','marker','geometry','drawing'], // Add libraries you need
  });

  return {
    provide: {
      googleMaps: loader,
    },
  };
});
