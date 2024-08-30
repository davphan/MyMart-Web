export default function Overview() {
  return(
    <div className="flex flex-col items-center py-12 w-4/5 mx-auto">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-xl">What is MyMart?</h1>
        <p className="text-center py-6">
          MyMart helps you optimize your grocery management by keeping track of
          your stored groceries, finding you the best grocery prices, and
          helping you along your shopping trips.
        </p>
      </div>
      <div className="relative flex flex-col justify-center w-4/5 gap-10">
        <div className="flex flex-col items-center gap-5">
          <h2 className="font-medium text-lg text-center">Track your Groceries</h2>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1le2LOL-3Kf-89ld_0TGfupv0Fhcgq2j8Wg&s"
            className="w-20 h-20 "
          />
          <p className="text-center">
            Keep a list of your current groceries so you know what you can cook
            and when you need to go shopping again.
          </p>
        </div>
        <div className="block h-0.5 w-full mx-auto bg-gray-200"/>
        <div className="flex flex-col items-center gap-5">
          <h2 className="font-medium text-lg text-center">Find the Best Prices</h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/7500/7500362.png"
            className="w-20 h-20 "
          />
          <p className="text-center">
            Locate what stores have the best prices for your groceries so you can
            cut down on your grocery bills.
          </p>
        </div>
        <div className="block h-0.5 w-full mx-auto bg-gray-200"/>
        <div className="flex flex-col items-center gap-5">
          <h2 className="font-medium text-lg text-center">Manage your Shopping Trip</h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/854/854980.png"
            className="w-20 h-20 "
          />
          <p className="text-center">
            Optimize your grocery trips with route by route guidance and grocery
            lists so you know where to go and what's left to buy.
          </p>
        </div>
      </div>
    </div>
  );
}