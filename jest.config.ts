import type {InitialOptionsTsJest} from 'ts-jest';
import {defaultsESM} from 'ts-jest/presets';

const config: InitialOptionsTsJest = {transform: defaultsESM.transform};

export default config;
