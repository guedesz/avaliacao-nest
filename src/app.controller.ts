import axios from 'axios';
import { Controller, Get, Query, Delete, Post, Body, Headers } from '@nestjs/common';
import { ProductClient } from './client/ProductClient';

@Controller()
export class AppController {
  private productClient:ProductClient;

  public constructor() {
    this.productClient = ProductClient.getInstance();
  }

    @Post('insert-products')
    public async insertProducts(@Body() body: {
      user: string, password: string, products: any
    }) {

      const { user, password, products } = body;

      await this.productClient.authenticationProcess(
        user,
        password
      );

      const response = await this.productClient.insertProducts(user, password, products);

      return (await this.productClient.products()).data
    }

  }
  /**
   * Endpoit que recebe o nome de um cliente
   * 
   * Busca a informação de usuário na UserClient
   * Trabalha a informação para isolar o nome e a senha deste cliente
   * 
   * Passa essas informações na ProductClient para autenticar
   * returna o array da product cliente
   */


//   @Delete('delete_product_price200')
//   public async deleteProduct(@Query('name') name: string) {
//     const response = [];
//     const {email, password} = await this.getUserInformation(name);

//     await this.productClient.authenticationProcess(
//       email,
//       password
//     );

//     await this.productClient.authenticationProcess(
//       email,
//       password
//     );
    
//     const productsFiltered = (await this.productClient.products())
//       .data
//       .filter(e => e.price === '200.00');

//     for(let i = 0; i < productsFiltered.length; i++) {
//       response.push(await this.productClient.destroyer(productsFiltered[i].id));
//     }

//     return response;
//   }

// }