import postcssFluid from '@lehoczky/postcss-fluid';
import autoprefixer from 'autoprefixer';
import postcssColorScheme from 'postcss-color-scheme';
import postcssPresetEnv from 'postcss-preset-env';
import postcssSimpleVars from 'postcss-simple-vars';

export default {
  plugins: [
    postcssPresetEnv(),
    postcssSimpleVars(),
    autoprefixer(),
    postcssColorScheme(),
    postcssFluid({ max: '2000px', min: '600px', }),
  ],
}
