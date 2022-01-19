import lwc from "@lwc/rollup-plugin";
import replace from "@rollup/plugin-replace";
// import run from "@rollup/plugin-run";

//import { nodeResolve } from '@rollup/plugin-node-resolve';


export default {
    input: "src/client/index.js",

    output: {
        file: "src/client/bundle.js",
        format: "esm",
    },

    plugins: [ 
        replace({
            "process.env.NODE_ENV": JSON.stringify("development"),
        }),
        lwc() 
        // ,run()
        // ,nodeResolve({
        //     browser: true,
        //   }),
    ],
};