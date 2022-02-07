//needed by lwc
import lwc from "@lwc/rollup-plugin";
import replace from "@rollup/plugin-replace"; 
//needed by socket.io-client
import resolve from "@rollup/plugin-node-resolve"; 
import commonjs from "@rollup/plugin-commonjs";


export default {
    input: "src/client/index.js",
    external: ['socket.io-client'], // <-- suppresses the warning
    output: {
        file: "src/client/bundle.js",
        format: "esm",
    },
    plugins: [ 
        replace({
            "process.env.NODE_ENV": JSON.stringify("development"),
        }),
        lwc(), 
        resolve({
            browser: true,
          }),
        commonjs(),
    ],
};