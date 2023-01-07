const getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'Các chuyến tham quan'
  });
};

const getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'Du Lịch Quảng Ninh'
  });
};

module.exports = {
  getOverview,
  getTour
};
