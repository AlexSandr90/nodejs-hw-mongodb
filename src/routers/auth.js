import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
  requestResetEmailSchema,
  loginWithGoogleOAuthSchema,
} from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  resetPasswordController,
  requestResetEmailController,
  getGoogleOAuthUrlController,
  refreshUserSessionController,
  loginWithGoogleController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController)
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController)
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController)
);

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController)
);

router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

router.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController)
);

export default router;
