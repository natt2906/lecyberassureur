const test = require('node:test');
const assert = require('node:assert/strict');

const {
  MIN_FORM_COMPLETION_MS,
  SUSPECT_FORM_COMPLETION_MS,
  getLeadFingerprint,
  getLeadReviewDecision,
  isAcceptedActivityDomain,
  isRejectedCompanyName,
  isRejectedFrenchPhone,
  isValidFrenchPhone,
  toCanonicalPhone,
} = require('./.compiled/src/lib/leadReview.js');

test('normalise et valide un numéro français classique', () => {
  assert.equal(isValidFrenchPhone('06 12 34 56 78'), true);
  assert.equal(toCanonicalPhone('06 12 34 56 78'), '+33612345678');
  assert.equal(getLeadFingerprint('06 12 34 56 78'), '+33612345678');
});

test('rejette les faux numéros connus et les répétitions évidentes', () => {
  assert.equal(isRejectedFrenchPhone('06 77 77 77 77'), true);
  assert.equal(isRejectedFrenchPhone('06 06 06 06 06'), true);
  assert.equal(isRejectedFrenchPhone('01 23 45 67 89'), true);
});

test('rejette les noms d’entreprise manifestement bidons', () => {
  assert.equal(isRejectedCompanyName('test'), true);
  assert.equal(isRejectedCompanyName('azerty'), true);
  assert.equal(isRejectedCompanyName('jdgshsgh'), true);
});

test('accepte un nom d’entreprise plausible', () => {
  assert.equal(isRejectedCompanyName('Prorisk Assurances'), false);
  assert.equal(isRejectedCompanyName('Cabinet Martin Conseil'), false);
  assert.equal(isRejectedCompanyName('test form'), false);
});

test('n’accepte que les domaines d’activité connus', () => {
  assert.equal(isAcceptedActivityDomain('Assurance, courtage et mutuelle'), true);
  assert.equal(isAcceptedActivityDomain('Hzfbl,N'), false);
});

test('classe accepted, suspect et rejected selon le temps et la churn IP', () => {
  assert.deepEqual(
    getLeadReviewDecision({
      submissionStatus: 'submitted',
      formCompletionMs: MIN_FORM_COMPLETION_MS + 2500,
      isPhoneChurnSuspicious: false,
    }),
    {
      reviewStatus: 'accepted',
      reviewReason: 'validated',
    },
  );

  assert.deepEqual(
    getLeadReviewDecision({
      submissionStatus: 'submitted',
      formCompletionMs: MIN_FORM_COMPLETION_MS + 500,
      isPhoneChurnSuspicious: false,
    }),
    {
      reviewStatus: 'suspect',
      reviewReason: 'fast_submission',
    },
  );

  assert.deepEqual(
    getLeadReviewDecision({
      submissionStatus: 'submitted',
      formCompletionMs: SUSPECT_FORM_COMPLETION_MS + 2000,
      isPhoneChurnSuspicious: true,
    }),
    {
      reviewStatus: 'suspect',
      reviewReason: 'ip_phone_churn',
    },
  );

  assert.deepEqual(
    getLeadReviewDecision({
      submissionStatus: 'submitted',
      formCompletionMs: MIN_FORM_COMPLETION_MS - 1,
      isPhoneChurnSuspicious: false,
    }),
    {
      reviewStatus: 'rejected',
      reviewReason: 'submitted_too_fast',
    },
  );
});

test('classe les brouillons non soumis en suspect', () => {
  assert.deepEqual(
    getLeadReviewDecision({
      submissionStatus: 'not_submitted',
      formCompletionMs: 0,
      isPhoneChurnSuspicious: false,
    }),
    {
      reviewStatus: 'suspect',
      reviewReason: 'abandoned_draft',
    },
  );
});
