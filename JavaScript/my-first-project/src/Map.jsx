function Map(){
    let x = 500;
    let fruits = ["Apple", "Banana", "Cherry"];
    let numbers = [1,2,3,4,5,6,7,8,9,10];
    let evenNumbers = numbers.filter( (n) =>  n % 2 === 0 )
    let oddNumbers = numbers.filter( (n) =>  n % 2 !== 0 )
    return (
        <>
            <div>
                <h1>Welcome to React Application</h1>
                fruits:<ul>{
                     fruits.map( (fruit) => <li>{fruit}</li> )
                }</ul>

                
            Even numbers:<ul>{
            evenNumbers.map( (n) => <li>{n}</li> )
            }</ul>

            Odd numbers:<ul>{
            oddNumbers.map( (n) => <li>{n}</li> )
            }</ul>

            </div>
            <div>
                <h2>Subheading</h2>
                <p>This is paragraph two</p>
            </div>
        </>
    )
}
export default App;