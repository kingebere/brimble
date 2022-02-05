// Frameworks array gotten from Vercel opensource project
const frameworks = [
  //VueJS
  {
    name: "Vue.js",
    slug: "vue",
    demo: "",
    logo: "https://vuejs.org/images/logo.svg",
    tagline:
      "Vue.js is a versatile JavaScript framework that is as approachable as it is performant.",
    description: "A Vue.js app, created with the Vue CLI.",
    website: "https://vuejs.org",
    envPrefix: "VUE_APP_",
    detector:
      '"(dev)?(d|D)ependencies":\\s*{[^}]*"@vue\\/cli-service":\\s*".+?"[^}]*}',
    settings: {
      installCommand: {
        placeholder: "`yarn install` or `npm install`",
      },
      buildCommand: {
        placeholder: "`npm run build` or `vue-cli-service build`",
      },
      devCommand: {
        value: "vue-cli-service serve --port $PORT",
      },
      outputDirectory: {
        value: "dist",
      },
    },
    dependency: "@vue/cli-service",
    devCommand: "vue-cli-service serve --port $PORT",
    buildCommand: "vue-cli-service build",
  },
  //ReactJS
  {
    name: "Create React App",
    slug: "create-react-app",
    demo: "",
    logo: "",
    tagline: "Create React App allows you to get going with React in no time.",
    description:
      "A React app, bootstrapped with create-react-app, and a Serverless Function API.",
    website: "https://create-react-app.dev",
    envPrefix: "REACT_APP_",
    detector:
      '"(dev)?(d|D)ependencies":\\s*{[^}]*"react-scripts":\\s*".+?"[^}]*}',
    settings: {
      installCommand: {
        placeholder: "`yarn install` or `npm install`",
      },
      buildCommand: {
        placeholder: "`npm run build` or `react-scripts build`",
      },
      devCommand: {
        value: "react-scripts start",
      },
      outputDirectory: {
        value: "build",
      },
    },
    dependency: "react-scripts",
    devCommand: "react-scripts start",
    buildCommand: "react-scripts build",
  },
  //Preact
  {
    name: "Preact",
    slug: "preact",
    demo: "",
    logo: "",
    tagline:
      "Preact is a fast 3kB alternative to React with the same modern API.",
    description: "A Preact app, created with the Preact CLI.",
    website: "https://preactjs.com",
    envPrefix: "PREACT_APP_",
    detector: '"(dev)?(d|D)ependencies":\\s*{[^}]*"preact-cli":\\s*".+?"[^}]*}',
    settings: {
      installCommand: {
        placeholder: "`yarn install` or `npm install`",
      },
      buildCommand: {
        placeholder: "`npm run build` or `preact build`",
      },
      devCommand: {
        value: "preact watch --port $PORT",
      },
      outputDirectory: {
        value: "build",
      },
    },
    dependency: "preact-cli",
    devCommand: "preact watch --port $PORT",
    buildCommand: "preact build",
  },
  //AngularJS
  {
    name: "AngularJS",
    slug: "angular",
    demo: "",
    logo: "",
    tagline:
      "AngularJS lets you write client-side web applications as if you had a smarter browser",
    description: "The modern web developer's platform",
    website: "https://angular.io",
    envPrefix: "ANGULAR_APP_",
    detector: '"(dev)?(d|D)ependencies":\\s*{[^}]*"@angular-devkit\\/build-angular":\\s*".+?"[^}]*}',
    settings: {
      installCommand: {
        placeholder: "`yarn install` or `npm install`",
      },
      buildCommand: {
        placeholder: "`npm run build` or `ng build`",
      },
      devCommand: {
        value: "ng serve",
      },
      outputDirectory: {
        value: "build",
      },
    },
    dependency: "ng",
    devCommand: "ng watch --port $PORT",
    buildCommand: "ng build",
  },
  //Svelte Js
  {
    name: "SvelteJS",
    slug: "svelte",
    demo: "",
    logo: "",
    tagline:
      "Svelte is a radical new approach to building user interfaces.", 
    description: "Cybernetically enhanced web apps",
    website: "https://svelte.dev",
    envPrefix: "SVELTE_APP_",
    detector: '"(dev)?(d|D)ependencies":\\s*{[^}]*"svelte":\\s*".+?"[^}]*}',
    settings: {
      installCommand: {
        placeholder: "`yarn install` or `npm install`",
      },
      buildCommand: {
        placeholder: "`npm run build`",
      },
      devCommand: {
        value: "npm run dev",
      },
      outputDirectory: {
        value: "build",
      },
    },
    dependency: "svelte",
    devCommand: "ng watch --port $PORT",
    buildCommand: "npm run build",
  },
  //NextJs
  {
    name: "NextJs",
    slug: "next",
    demo: "",
    logo: "",
    tagline:
      "Next.js gives you the best developer experience with all the features you need for production",
    description: "The React Framework for Production",
    website: "https://nextjs.org",
    detector: '"(dev)?(d|D)ependencies":\\s*{[^}]*"next":\\s*".+?"[^}]*}',
    settings: {
      installCommand: {
        placeholder: "`yarn install` or `npm install`",
      },
      buildCommand: {
        placeholder: "`npm run build` or `next build`",
      },
      devCommand: {
        value: "npm run dev",
      },
      outputDirectory: {
        value: "build",
      },
    },
    dependency: "next",
    devCommand: "next dev -p $PORT",
    buildCommand: "next build",
  },
];

const detectFramework = (packageJson: any) => {
  const detectFramework = frameworks.find((rx) => {
    const regex = new RegExp(rx.detector, "gm");
    return regex.test(JSON.stringify(packageJson));
  });
  if (detectFramework) {
    return detectFramework;
  }
  return {
    name: "Other",
    slug: null,
    logo: "",
    description: "No framework detected.",
    settings: {
      installCommand: {
        placeholder: "`yarn install` or `npm install`",
      },
      buildCommand: {
        placeholder: "`npm run brimble-build` or `npm run build`",
        value: null,
      },
      devCommand: {
        placeholder: "None",
        value: null,
      },
      outputDirectory: {
        placeholder: "`public` if it exists, or `.`",
      },
    },
  };
};

export default detectFramework;
