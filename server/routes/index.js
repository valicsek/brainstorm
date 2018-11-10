const express = require('express');
const router = express.Router();
const fs = require('fs');


function readGroupFile(callback) {
    return new Promise(function (resolve, reject) {
        fs.readFile('./data/index.json', 'utf8', function (err, data) {
            let obj;
            if (err) reject(err)
            obj = JSON.parse(data);
            resolve(obj);
        });
    });
}

function saveGroupFile(jsonString) {
    return new Promise(function (resolve, reject) {
        fs.writeFile('./data/index.json', jsonString, 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(true);
        });
    });
}

router.route('/api/modules')
    /** List all modules */
    .get((req, res) => {
        readGroupFile()
            .then((json) => res.json(json))
            .catch((err) => res.json({ success: false, message: err.message }));
    })
    /** Create a new module */
    .post((req, res) => {
        readGroupFile()
            .then((json) => {
                if (!req.body.item) { throw new Error('The item parameter is missing'); }
                json.push(req.body.item);
                return JSON.stringify(json);
            })
            .then((json) => saveGroupFile(json))
            .then(() => res.json({ success: true, message: 'Finished.' }))
            .catch((err) => res.json({ success: false, message: err.message }));
    });

router.route('/api/modules/:module_id')
    .get((req, res) => {
        readGroupFile()
            .then((json) => {
                if (!req.params.module_id) { throw new Error('The module_id parameter is missing'); }
                const group = json.filter((group) => group.id == req.params.module_id);
                return group;
            })
            .then((data) => res.json({ success: true, message: 'Finished.', data: data }))
            .catch((err) => res.json({ success: false, message: err.message }));
    })
    .put((req, res) => {
        const module_id = req.params.module_id;
        readGroupFile((json) => {
            const group = json.filter((group) => group.id == module_id);
        });
    })
    .delete((req, res) => {
        readGroupFile()
            .then((json) => {
                if (!req.params.module_id) { throw new Error('The module_id parameter is missing'); }
                const group = json.filter((group) => group.id != req.params.module_id);
                return JSON.stringify(group);
            })
            .then((jsonString) => saveGroupFile(jsonString))
            .then((data) => res.json({ success: true, message: 'Finished.', data }))
            .catch((err) => res.json({ success: false, message: err.message }));
    });

router.route('/api/modules/:module_id/mindmap')
    .get((req, res) => {
        readGroupFile()
            .then((json) => {
                if (!req.params.module_id) { throw new Error('The module_id parameter is missing'); }
                const group = json.filter((group) => group.id == module_id);
                return group[0].MindMap;
            })
            .then((data) => res.json({ success: true, message: 'Finished.', data }))
            .catch((err) => res.json({ success: false, message: err.message }));
    })
    .put((req, res) => {
        readGroupFile()
            .then((json) => {
                if (!req.body.module_id) { throw new Error('The module_id parameter is missing'); }
                if (!req.body.mindmap) { throw new Error('The mindmap parameter is missing'); }

                const group = json.filter((group) => group.id == req.body.module_id);
                group[0].MindMap = req.body.mindmap;
                return JSON.stringify(json);
            })
            .then((jsonString) => saveGroupFile(jsonString))
            .then((data) => res.json({ success: true, message: 'Finished.', data }))
            .catch((err) => res.json({ success: false, message: err.message }));
    })

router.route('/api/modules/:module_id/storm')
    .get((req, res) => {
        readGroupFile()
            .then((json) => {
                if (!req.params.module_id) { throw new Error('The module_id parameter is missing'); }
                if (!req.body.item) { throw new Error('The item parameter is missing'); }

                const module_id = req.params.module_id;
                const storm = req.body.item;
                const groups = json.filter((group) => group.id == module_id);
                return groups[0].stormArray;
            })
            .then((data) => res.json({ success: true, message: 'Finished.', data }))
            .catch((err) => res.json({ success: false, message: err.message }));
    })
    .post((req, res) => {
        readGroupFile()
            .then((json) => {
                if (!req.params.module_id) { throw new Error('The module_id parameter is missing'); }
                if (!req.body.item) { throw new Error('The item parameter is missing'); }

                const storm = req.body.item;
                const groups = json.filter((group) => group.id == req.params.module_id);
                groups[0].stormArray.push(
                    storm
                );
                return JSON.stringify(json);
            })
            .then((jsonStringify) => saveGroupFile(jsonStringify))
            .then((data) => res.json({ success: true, message: 'Finished.', data }))
            .catch((err) => res.json({ success: false, message: err.message }));
    })
    .delete((req, res) => {
        readGroupFile()
            .then((json) => {
                if (!req.params.module_id) { throw new Error('The module_id parameter is missing'); }
                const groups = json.filter((group) => group.id == module_id);
                groups.stormArray = [];
                return JSON.stringify(storms);
            })
            .then((jsonStringify) => saveGroupFile(jsonStringify))
            .then((data) => res.json({ success: true, message: 'Finished.', data }))
            .catch((err) => res.json({ success: false, message: err.message }));
    })

router.route('/api/modules/:module_id/storm/:storm_id')
    .delete((req, res) => {
        readGroupFile()
            .then((json) => {
                if (!req.params.module_id) { throw new Error('The module_id parameter is missing'); }
                if (!req.params.storm_id) { throw new Error('The storm_id parameter is missing'); }
                let groups = json.filter((group) => group.id == req.params.module_id);
                if (groups[0]) {
                    groups[0].stormArray = groups[0].stormArray.filter((storm) => storm.id != req.params.storm_id);
                } else throw new Error(`Group not exists with ${req.params.module_id} id`);

                return JSON.stringify(json);
            })
            .then((jsonStringify) => saveGroupFile(jsonStringify))
            .then((data) => res.json({ success: true, message: 'Finished.', data }))
            .catch((err) => res.json({ success: false, message: err.message }));
    })

router.route('/api/modules/:module_id/draw')
    .get((req, res) => { })
    .post((req, res) => { })

router.route('/api/modules/:module_id/draw/:draw_id')
    .get((req, res) => { })
    .delete((req, res) => { })

module.exports = router;