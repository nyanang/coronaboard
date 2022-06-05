// 1. GlobalStat 객체 가져오기
const {GlobalStat} = require('../database'); 
const { wrapWithErrorHandler } = require('../util');
// 2. 데이터 조회

async function getAll(req, res) {
    const result = await GlobalStat.findAll(); // SELECT문과 동일
    res.status(200).json({ result });
}

// 3. 데이터 삽입 또는 업데이트

async function insertOrUpdate(req, res) {
    const {cc, date} = req.body;
    if (!cc || !date) {
        res.status(400).json({ error: 'cc and date are required'}) ;
        return;
    }


// 조건(국가 코드와 날짜)에 맞는 데이터 개수 확인

    const count = await GlobalStat.count({where : {cc, date}}); // SELECT 구문 이후 검색된 레코드 개수

    if (count === 0) {
        await GlobalStat.create(req.body); // INSERT 구문
        } else {
            await GlobalStat.update(req.body, {where: {cc, date}}); // UPDATE 구문
        }

        res.status(200).json({ result: 'success'});
}

// 데이터 삭제

async function remove(req, res) {
    const {cc, date} = req.body;
    if (!cc || !date) {
        res.status(400).json({error: 'cc and date are required'});
        return;
    }

    await GlobalStat.destroy({
        where: {
            cc,
            date,
        },
    }); // DELETE 구문

    res.status(200).json({result:'success'});
}

module.exports = wrapWithErrorHandler({
    getAll,
    insertOrUpdate,
    remove,
});