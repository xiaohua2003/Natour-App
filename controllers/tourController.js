const fs = require("fs");
// tour router handlers
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
exports.checkId = (req, res, next, val) => {
    console.log(`id is :${val}`)
    const id = req.params.id * 1
    if (id > tours.length) {
        return res.status(404).json({ status: "faild", message: "not find id" })
    }
    next()
}
exports.checkBody = (req, res, next) => {
    if (!req.body.price || !req.body.name) {
        return res.status(400).json({ status: 'fail', message: 'miss name or price' })
    }
    next()
}
exports.getAllTours = (req, res) => {
    res.status(200).json({ status: "success", requestAt: req.requestTime, data: { tours } })
}
exports.getSingleTour = (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)
    res.status(200).json({ tour: tour })

}
exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours),
        (err) => {
            if (err) console.log(err);
            else {
                res.json({ status: 'success', data: { tour: newTour } })
            }
        }
    )
}
exports.updateTour = (req, res) => {

    res.status(200).json({ status: "success", message: "it is updated" })

}
exports.deleteTour = (req, res) => {

    res.status(404).json({ status: "success", message: "it is deleted" })

}