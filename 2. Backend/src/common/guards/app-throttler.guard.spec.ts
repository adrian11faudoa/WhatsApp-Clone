import { AppThrottlerGuard } from './app-throttler.guard';

// Access the protected methods for direct unit testing without spinning up
// a full Nest application / Redis-backed throttler storage.
class TestableGuard extends AppThrottlerGuard {
  public testGetTracker(req: Record<string, any>) {
    return (this as any).getTracker(req);
  }
  public testShouldSkip(context: any) {
    return (this as any).shouldSkip(context);
  }
}

describe('AppThrottlerGuard', () => {
  const guard = Object.create(TestableGuard.prototype) as TestableGuard;

  const originalNodeEnv = process.env.NODE_ENV;
  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  describe('getTracker', () => {
    it('tracks by authenticated user ID when available', async () => {
      const tracker = await guard.testGetTracker({
        user: { userId: 'user-123' },
        ip: '203.0.113.5',
      });
      expect(tracker).toBe('user:user-123');
    });

    it('falls back to IP when unauthenticated', async () => {
      const tracker = await guard.testGetTracker({ ip: '203.0.113.5' });
      expect(tracker).toBe('ip:203.0.113.5');
    });

    it('prefers the first entry of req.ips when present (proxy chain)', async () => {
      const tracker = await guard.testGetTracker({
        ips: ['203.0.113.9', '10.0.0.1'],
        ip: '10.0.0.1',
      });
      expect(tracker).toBe('ip:203.0.113.9');
    });
  });

  describe('shouldSkip', () => {
    it('skips throttling when NODE_ENV=test', async () => {
      process.env.NODE_ENV = 'test';
      await expect(guard.testShouldSkip({} as any)).resolves.toBe(true);
    });

    it('does not skip throttling outside of tests', async () => {
      process.env.NODE_ENV = 'production';
      await expect(guard.testShouldSkip({} as any)).resolves.toBe(false);

      process.env.NODE_ENV = 'development';
      await expect(guard.testShouldSkip({} as any)).resolves.toBe(false);
    });
  });
});
