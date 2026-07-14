/**
 * Effort mapper round-trips for the v2 OpenAI provider boundary.
 *
 * OpenAI documents `max` as a distinct reasoning effort (GPT-5.6), so a
 * caller who selects `max` must send `max` on the wire — not a silent
 * downgrade to `xhigh`. See issue #1639.
 */

import { describe, expect, it } from 'vitest';

import {
  reasoningEffortToThinkingEffort,
  thinkingEffortToReasoningEffort,
} from '#/app/llmProtocol/providers/openai-common';

describe('thinkingEffortToReasoningEffort', () => {
  it('maps off -> undefined', () => {
    expect(thinkingEffortToReasoningEffort('off')).toBeUndefined();
  });
  it('maps low -> "low"', () => {
    expect(thinkingEffortToReasoningEffort('low')).toBe('low');
  });
  it('maps medium -> "medium"', () => {
    expect(thinkingEffortToReasoningEffort('medium')).toBe('medium');
  });
  it('maps high -> "high"', () => {
    expect(thinkingEffortToReasoningEffort('high')).toBe('high');
  });
  it('maps xhigh -> "xhigh"', () => {
    expect(thinkingEffortToReasoningEffort('xhigh')).toBe('xhigh');
  });
  it('maps max -> "max" (passes through verbatim)', () => {
    expect(thinkingEffortToReasoningEffort('max')).toBe('max');
  });
  it('normalizes unknown effort to undefined', () => {
    expect(thinkingEffortToReasoningEffort('extreme' as never)).toBeUndefined();
  });
});

describe('reasoningEffortToThinkingEffort', () => {
  it('returns null for undefined', () => {
    const effort: string | undefined = undefined;
    expect(reasoningEffortToThinkingEffort(effort)).toBeNull();
  });
  it('maps "low" -> low', () => {
    expect(reasoningEffortToThinkingEffort('low')).toBe('low');
  });
  it('maps "minimal" -> low (alias)', () => {
    expect(reasoningEffortToThinkingEffort('minimal')).toBe('low');
  });
  it('maps "medium" -> medium', () => {
    expect(reasoningEffortToThinkingEffort('medium')).toBe('medium');
  });
  it('maps "high" -> high', () => {
    expect(reasoningEffortToThinkingEffort('high')).toBe('high');
  });
  it('maps "xhigh" -> xhigh', () => {
    expect(reasoningEffortToThinkingEffort('xhigh')).toBe('xhigh');
  });
  it('maps "max" -> max', () => {
    expect(reasoningEffortToThinkingEffort('max')).toBe('max');
  });
  it('maps "none" -> off', () => {
    expect(reasoningEffortToThinkingEffort('none')).toBe('off');
  });
  it('unknown values fall back to off', () => {
    expect(reasoningEffortToThinkingEffort('ultra')).toBe('off');
  });
});
