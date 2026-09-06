import type { ComponentType } from 'react';
import Calculator from './Calculator.jsx';
import CardMilesConverter from './CardMilesConverter.jsx';
import ColorPalettes from './ColorPalettes.jsx';
import ColorValueConverter from './ColorValueConverter.jsx';
import DuplicatedParagraphScanner from './DuplicatedParagraphScanner.jsx';
import EmojiFoodCatcher from './EmojiFoodCatcher.jsx';
import MemoryCards from './MemoryCards.jsx';
import Minesweeper from './Minesweeper.jsx';
import PasswordCreator from './PasswordCreator.jsx';
import PasswordStrengthMeter from './PasswordStrengthMeter.jsx';
import QrCodeGenerator from './QrCodeGenerator.jsx';
import Timers from './Timers.jsx';
import Translator from './Translator.jsx';

/**
 * Maps each tool entry's `reactComponent` frontmatter value (see
 * src/data/tool-component-map.json) to the ported React island that used to
 * be mounted via `<div data-react-component="...">` + tool-loader.jsx on
 * the Laravel site. Astro mounts these directly as islands instead.
 */
export const TOOL_REGISTRY: Record<string, ComponentType> = {
  calculator: Calculator,
  'card-miles-converter': CardMilesConverter,
  'color-palettes': ColorPalettes,
  'color-value-converter': ColorValueConverter,
  'duplicated-paragraph-scanner': DuplicatedParagraphScanner,
  'emoji-food-catcher': EmojiFoodCatcher,
  'memory-cards': MemoryCards,
  minesweeper: Minesweeper,
  'password-creator': PasswordCreator,
  'password-strength-meter': PasswordStrengthMeter,
  'qr-code-generator': QrCodeGenerator,
  timers: Timers,
  translator: Translator,
};
