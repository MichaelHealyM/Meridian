import { Tooltip } from 'bootstrap';
import { findAll } from '../../shared/dom';

findAll('[data-bs-toggle="tooltip"]').forEach((element) => new Tooltip(element));
