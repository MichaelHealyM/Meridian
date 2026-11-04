import { Popover } from 'bootstrap';
import { findAll } from '../../../shared/dom';

findAll('[data-bs-toggle="popover"]').forEach((element) => new Popover(element));
