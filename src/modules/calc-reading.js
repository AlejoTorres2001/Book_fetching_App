const TIME_PER_PAGE=1.6;

function calcReading(pages){
    return TIME_PER_PAGE * pages / 60
}
export default calcReading