import React from 'react';
import ApexCharts from 'react-apexcharts';
const ProductDetailsPage = ({product}) => {
     const {name,url: productUrl,img,source,created_at: createdAt,priceHistory} = product;
     function formatDate(date){
          var aaaa = date.getFullYear();
          var gg = date.getDate();
          var mm = date.getMonth() + 1;
          if(gg < 10) gg = '0' + gg;
          if(mm < 10) mm = '0' + mm;
          var current_day = aaaa + '-' + mm + '-' + gg;
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var seconds = date.getSeconds();
          if(hours < 10) hours = '0' + hours;
          if(minutes < 10) minutes = '0' + minutes;
          if(seconds < 10) seconds = '0' + seconds;
          return current_day + " " + hours + ':' + minutes + ':' + seconds;
     }
     const dates = priceHistory.map((history) => formatDate(new Date(history.date))).reverse();
     const prices = priceHistory.map((history) => history.price).reverse();
     const chartData = {
          options: {
               chart: {id: 'price-chart'},
               xaxis: {categories: dates},
          },
          series: [
               {
                    name: 'price',
                    data: prices,
               },
          ],
     };
     return (
          <div>
               <h2>{name}</h2>
               <img src={img} alt="Product"/>
               <p>url:{" "} <a href={`${source}${productUrl}`} target="_blank" rel="noreferrer">view product.</a></p>
               <p>source:{" "} <a href={source} target="_blank" rel="noreferrer">{source}</a></p>
               <p>newest price at: {createdAt}</p>
               <h2>price history</h2>
               <h3>current price: ${prices.length > 0 ? prices[prices.length - 1] : 'N/A'}</h3>
               <ApexCharts options={chartData.options} series={chartData.series} height={300} type='line'/>
          </div>
     );
};
export default ProductDetailsPage;