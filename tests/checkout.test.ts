import { test, expect } from '@playwright/test';
import { REGISTER_SELECTORS} from '../selectors/register_selectors';
import defaultUserData from '../fixtures/defaultUserData.json';
import {format} from 'date-fns';

