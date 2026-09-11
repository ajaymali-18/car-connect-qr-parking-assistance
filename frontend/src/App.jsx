import { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import './App.css';
import axios from "axios";
import heroImg from './assets/parking.jpg';
/* ── Floating particles config ── */
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  size: Math.random() * 5 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 12,
  duration: Math.random() * 14 + 14,
}));

/* ── Google SVG ── */
const GoogleIcon = () => (
  <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

/* ── Eye toggle icons ── */
const EyeIcon = ({ open }) =>
  open ? (
    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
    </svg>
  ) : (
    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
    </svg>
  );

/* ── Back arrow icon ── */
const BackArrow = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
  </svg>
);

/* ══════════════════════════════════════════════════
   QR SCANNER OVERLAY
══════════════════════════════════════════════════ */
function QRScannerOverlay({ onClose, onScanSuccess }) {
  const [permError, setPermError] = useState('');
  const [isStarting, setIsStarting] = useState(true);
  const scannerRef = useRef(null);
  const html5QrRef = useRef(null);

  const stopScanner = useCallback(async () => {
    if (html5QrRef.current) {
      try {
        await html5QrRef.current.stop();
        html5QrRef.current.clear();
      } catch (_) { /* already stopped */ }
      html5QrRef.current = null;
    }
  }, []);

  const handleClose = useCallback(async () => {
    await stopScanner();
    onClose();
  }, [stopScanner, onClose]);

  useEffect(() => {
    // Prevent body scroll while scanner is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const SCANNER_ID = 'qr-reader-video';
    const qr = new Html5Qrcode(SCANNER_ID);
    html5QrRef.current = qr;

    const config = {
      fps: 15,
      qrbox: { width: 240, height: 240 },
      aspectRatio: 1.0,
      experimentalFeatures: { useBarCodeDetectorIfSupported: true },
    };

    qr.start(
      { facingMode: 'environment' },
      config,
      async (decodedText) => {
        await stopScanner();
        onScanSuccess(decodedText);
        onClose();
      },
      () => { /* frame-level errors – ignore */ }
    )
      .then(() => setIsStarting(false))
      .catch((err) => {
        setIsStarting(false);
        const msg = String(err);
        if (msg.includes('Permission') || msg.includes('permission') || msg.includes('NotAllowed')) {
          setPermError('Camera permission was denied. Please allow camera access in your browser settings and try again.');
        } else {
          setPermError(`Could not start the camera: ${msg}`);
        }
      });

    return () => {
      document.body.style.overflow = prev;
      stopScanner();
    };
  }, [stopScanner, onScanSuccess, onClose]);

  return (
    <div className="qr-overlay" role="dialog" aria-modal="true" aria-label="QR Code Scanner">
      {/* Dimmed backdrop — 4 panels around the transparent frame */}
      <div className="qr-dim qr-dim-top" />
      <div className="qr-dim qr-dim-bottom" />
      <div className="qr-dim qr-dim-left" />
      <div className="qr-dim qr-dim-right" />

      {/* Hidden div that html5-qrcode mounts the <video> into */}
      <div id="qr-reader-video" className="qr-reader-host" />

      {/* Scanning frame (purely decorative) */}
      <div className="qr-frame" aria-hidden="true">
        <span className="qr-corner qr-corner-tl" />
        <span className="qr-corner qr-corner-tr" />
        <span className="qr-corner qr-corner-bl" />
        <span className="qr-corner qr-corner-br" />
        <div className="qr-scan-line" />
      </div>

      {/* Label below frame */}
      <p className="qr-label">Align the QR code within the frame</p>

      {/* Starting spinner */}
      {isStarting && !permError && (
        <div className="qr-starting">
          <span className="qr-spinner" />
          <span>Starting camera…</span>
        </div>
      )}

      {/* Permission / error state */}
      {permError && (
        <div className="qr-error-box">
          <p className="qr-error-msg">{permError}</p>
          <button className="qr-retry-btn" onClick={handleClose}>Close</button>
        </div>
      )}

      {/* Close button */}
      <button
        id="btn-qr-close"
        className="qr-close-btn"
        onClick={handleClose}
        aria-label="Close scanner"
      >
        ✕
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ONBOARDING PAGE
══════════════════════════════════════════════════ */
function OnboardingPage({ onLogin, onScanQR }) {
  return (
    <div className="ob-shell">
      <div className="onboarding-root">

        {/* Hero image */}
        <div className="ob-img-wrap">
          <img
            src={heroImg}
            alt="A car parked in a parking lot with a QR sticker"
            className="onboarding-hero-img"
          />
        </div>

        {/* Text content */}
        <div className="ob-content">
          <h1 className="onboarding-title">Blocked by a parked car?</h1>
          <p className="onboarding-desc">
            Scan the QR sticker and reach the owner in seconds.
            Fast, anonymous, and stress-free.
          </p>
        </div>

        {/* Bottom CTAs */}
        <div className="ob-footer">
          <button
            id="btn-onboarding-scan"
            className="btn-onboarding-login"
            onClick={onScanQR}
          >
            Scan a QR Code
          </button>
          <p className="onboarding-login-hint">
            Already have an account?{' '}
            <button
              id="btn-onboarding-login"
              className="onboarding-login-link"
              onClick={onLogin}
            >
              Log in
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════
   LOGIN PAGE
══════════════════════════════════════════════════ */
function LoginPage({ onGoSignup, onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    window.location.href = 'http://localhost:8080/api/v1/auth/login';
  };
  const handleGoogle = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <>
      {/* Logo */}
      <div className="auth-logo">
        <div className="auth-logo-icon">🚗</div>
        <span className="auth-logo-text">CarConnect</span>
      </div>

      <h1 className="auth-heading">Welcome back</h1>
      <p className="auth-subheading">Sign in to manage your QR parking experience</p>

      {/* Google */}
      <button id="btn-google-login" className="btn-google" onClick={handleGoogle} disabled={loading}>
        <GoogleIcon />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="auth-divider">
        <span className="auth-divider-line" />
        <span className="auth-divider-text">or</span>
        <span className="auth-divider-line" />
      </div>

      {/* Form */}
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="login-email">Email Address</label>
          <div className="input-wrapper">
            <span className="input-icon">✉</span>
            <input
              id="login-email"
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
            />
          </div>
          {errors.email && <span className="form-error">⚠ {errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="login-password">Password</label>
          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input
              id="login-password"
              className="form-input"
              type={showPwd ? 'text' : 'password'}
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete="current-password"
            />
            <button
              type="button"
              id="toggle-login-pwd"
              className="password-toggle"
              onClick={() => setShowPwd(!showPwd)}
              aria-label={showPwd ? 'Hide password' : 'Show password'}
            >
              <EyeIcon open={showPwd} />
            </button>
          </div>
          {errors.password && <span className="form-error">⚠ {errors.password}</span>}
        </div>

        <div className="forgot-row">
          <a id="forgot-link" href="#" className="forgot-link">Forgot password?</a>
        </div>

        <button id="btn-login-submit" type="submit" className="btn-submit" disabled={loading}>
          {loading && <span className="spinner" />}
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      {/* ── Signup prompt ── */}
      <div className="signup-prompt">
        <div className="signup-prompt-icon" title="New here?">👤</div>
        <span className="signup-prompt-text">New to CarConnect?</span>
        <button
          id="btn-go-signup"
          className="signup-prompt-btn"
          onClick={onGoSignup}
        >
          Create an account →
        </button>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════
   SIGNUP PAGE
══════════════════════════════════════════════════ */
function SignupPage({ onGoLogin, onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (!form.confirm) e.confirm = 'Please confirm your password';
    else if (form.confirm !== form.password) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/signup',
        { name: form.name, email: form.email, password: form.password }
      );
      setLoading(false);
      onSuccess('🎉 Account created! Welcome to CarConnect.');
    } catch (error) {
      setLoading(false);
      const msg = error?.response?.data?.message || 'Signup failed. Please try again.';
      setErrors({ confirm: msg });
    }
  };

  const handleGoogle = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <>
      {/* Back button */}
      <button id="btn-back-login" className="back-btn" onClick={onGoLogin}>
        <BackArrow /> Back to Login
      </button>

      {/* Logo */}
      <div className="auth-logo">
        <div className="auth-logo-icon">🚗</div>
        <span className="auth-logo-text">CarConnect</span>
      </div>

      <h1 className="auth-heading">Create account</h1>
      <p className="auth-subheading">Join CarConnect and simplify your parking experience</p>

      {/* Google */}
      <button id="btn-google-signup" className="btn-google" onClick={handleGoogle} disabled={loading}>
        <GoogleIcon />
        Sign up with Google
      </button>

      {/* Divider */}
      <div className="auth-divider">
        <span className="auth-divider-line" />
        <span className="auth-divider-text">or</span>
        <span className="auth-divider-line" />
      </div>

      {/* Form */}
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="signup-name">Full Name</label>
          <div className="input-wrapper">
            <span className="input-icon">👤</span>
            <input
              id="signup-name"
              className="form-input"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              autoComplete="name"
            />
          </div>
          {errors.name && <span className="form-error">⚠ {errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="signup-email">Email Address</label>
          <div className="input-wrapper">
            <span className="input-icon">✉</span>
            <input
              id="signup-email"
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
            />
          </div>
          {errors.email && <span className="form-error">⚠ {errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="signup-password">Password</label>
          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input
              id="signup-password"
              className="form-input"
              type={showPwd ? 'text' : 'password'}
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete="new-password"
            />
            <button
              type="button"
              id="toggle-signup-pwd"
              className="password-toggle"
              onClick={() => setShowPwd(!showPwd)}
              aria-label={showPwd ? 'Hide' : 'Show'}
            >
              <EyeIcon open={showPwd} />
            </button>
          </div>
          {errors.password && <span className="form-error">⚠ {errors.password}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="signup-confirm">Confirm Password</label>
          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input
              id="signup-confirm"
              className="form-input"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Re-enter your password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              autoComplete="new-password"
            />
            <button
              type="button"
              id="toggle-confirm-pwd"
              className="password-toggle"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label={showConfirm ? 'Hide' : 'Show'}
            >
              <EyeIcon open={showConfirm} />
            </button>
          </div>
          {errors.confirm && <span className="form-error">⚠ {errors.confirm}</span>}
        </div>

        <button id="btn-signup-submit" type="submit" className="btn-submit" disabled={loading}>
          {loading && <span className="spinner" />}
          {loading ? 'Creating account…' : 'Create Account'}
        </button>
      </form>

      {/* Terms */}
      <p style={{ textAlign:'center', fontSize:'0.75rem', color:'var(--text-muted)', marginTop:'18px', lineHeight:'1.6' }}>
        By signing up you agree to our{' '}
        <a href="#" style={{ color:'var(--neon-dim)', textDecoration:'none' }}>Terms</a>
        {' '}&amp;{' '}
        <a href="#" style={{ color:'var(--neon-dim)', textDecoration:'none' }}>Privacy Policy</a>
      </p>
    </>
  );
}

/* ══════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════ */
function App() {
  const [page, setPage] = useState('onboarding'); // 'onboarding' | 'login' | 'signup'
  const [animClass, setAnimClass] = useState('');
  const [toast, setToast] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  }, []);

  const handleScanSuccess = useCallback((decodedText) => {
    // Pass the decoded QR value into the existing app flow via the toast.
    // Replace this with your own business logic (e.g., navigate to a detail
    // page, make an API call, etc.) without changing anything else.
    showToast(`✅ QR scanned: ${decodedText}`);
  }, [showToast]);

  const navigate = (to) => {
    setAnimClass('slide-out');
    setTimeout(() => {
      setPage(to);
      setAnimClass('slide-in');
      setTimeout(() => setAnimClass(''), 450);
    }, 280);
  };

  return (
    <div className="auth-bg">
      {/* Grid scanlines */}
      <div className="grid-overlay" />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* QR Scanner Overlay — rendered above everything */}
      {showScanner && (
        <QRScannerOverlay
          onClose={() => setShowScanner(false)}
          onScanSuccess={handleScanSuccess}
        />
      )}

      {/* Onboarding (outside the dark card) */}
      {page === 'onboarding' && (
        <OnboardingPage
          onLogin={() => navigate('login')}
          onScanQR={() => setShowScanner(true)}
        />
      )}

      {/* Card */}
      {page !== 'onboarding' && (
        <div className={`auth-card ${animClass}`}>
          {page === 'login' ? (
            <LoginPage
              onGoSignup={() => navigate('signup')}
              onSuccess={showToast}
            />
          ) : (
            <SignupPage
              onGoLogin={() => navigate('login')}
              onSuccess={showToast}
            />
          )}
        </div>
      )}

      {/* Toast */}
      <div className={`toast${toast ? ' visible' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}

export default App;
