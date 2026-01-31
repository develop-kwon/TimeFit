/**
 * Input Sanitizer Utility Unit Tests
 */

import { describe, it, expect } from 'vitest';
import {
  sanitizeText,
  sanitizeEmail,
  sanitizePhone,
  sanitizeNumber,
  sanitizeUrl,
  sanitizeInput,
} from '../../src/utils/inputSanitizer';

describe('Input Sanitizer', () => {
  describe('sanitizeText', () => {
    it('removes HTML tags', () => {
      expect(sanitizeText('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'
      );
    });

    it('handles empty string', () => {
      expect(sanitizeText('')).toBe('');
    });

    it('handles non-string input', () => {
      expect(sanitizeText(null)).toBe('');
      expect(sanitizeText(123)).toBe('');
    });
  });

  describe('sanitizeEmail', () => {
    it('validates and sanitizes valid email', () => {
      expect(sanitizeEmail('Test@Example.COM')).toBe('test@example.com');
    });

    it('returns empty string for invalid email', () => {
      expect(sanitizeEmail('invalid-email')).toBe('');
      expect(sanitizeEmail('test@')).toBe('');
    });

    it('handles empty string', () => {
      expect(sanitizeEmail('')).toBe('');
    });
  });

  describe('sanitizePhone', () => {
    it('sanitizes phone number', () => {
      expect(sanitizePhone('010-1234-5678')).toBe('010-1234-5678');
      expect(sanitizePhone('010 1234 5678')).toBe('010 1234 5678');
    });

    it('removes invalid characters', () => {
      expect(sanitizePhone('010-1234-5678abc')).toBe('010-1234-5678');
    });

    it('returns empty string for too short number', () => {
      expect(sanitizePhone('123')).toBe('');
    });
  });

  describe('sanitizeNumber', () => {
    it('extracts only numbers', () => {
      expect(sanitizeNumber('abc123def456')).toBe('123456');
    });

    it('handles empty string', () => {
      expect(sanitizeNumber('')).toBe('');
    });
  });

  describe('sanitizeUrl', () => {
    it('validates http URL', () => {
      expect(sanitizeUrl('http://example.com')).toBe('http://example.com/');
    });

    it('validates https URL', () => {
      expect(sanitizeUrl('https://example.com')).toBe('https://example.com/');
    });

    it('returns empty string for invalid URL', () => {
      expect(sanitizeUrl('javascript:alert(1)')).toBe('');
      expect(sanitizeUrl('not-a-url')).toBe('');
    });
  });

  describe('sanitizeInput', () => {
    it('trims whitespace', () => {
      expect(sanitizeInput('  test  ')).toBe('test');
    });

    it('limits max length', () => {
      const longString = 'a'.repeat(600);
      expect(sanitizeInput(longString, 500).length).toBe(500);
    });

    it('removes HTML tags', () => {
      expect(sanitizeInput('<script>test</script>')).toContain('&lt;script&gt;');
    });
  });
});

