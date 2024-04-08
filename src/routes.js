import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Home page' });
});

router.get('/customer', (req, res) => {
  res.render('customer', { title: 'Customer page' });
});

router.get('/cusInfo', (req, res) => {
  res.render('cusInfo', { title: 'Guest page' });
});

router.get('/reason', (req, res) => {
  res.render('reason', { title: 'Reason' });
});
router.get('/dateTime', (req, res) => {
  res.render('dateTime', { title: 'Date and Time' });
});
router.get('/success', (req, res) => {
  res.render('success', { title: 'Success page' });
});

export default router;
