import React, { Component } from 'react'
import Booknew  from './booknew'


 class Discoverbook extends Component {
    state = {
        bookName : [{
           url : "https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086516440-GC263MEVYEOILFXK50SH/ke17ZwdGBToddI8pDm48kFLE1N8Pfvjr8qBbh-uMKh5Zw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVFo_lC0XzfGziC13YBD0x2a0lX_gV6t_lJtHJl1e1kjPsggc8cnUtsAbA7XihgXXgg/herr.jpg",
           name : "Beyond the empire",
           desc : "loremIpsum",
           categ : "newbook",
           author : "Neelabh",
           price : "$50"
        },
        {
           url : "https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086516832-AZRG9UYN4O6D1470NGNC/ke17ZwdGBToddI8pDm48kE-HYFY2krjI0XqIJBx7a51Zw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGLRCrtnb2P0lT8WcfXyPrlGVIlNjLAKgiiz8OnM4ScqG-Lxw-ZpOXF4zlFz7N9Xa8/hetjind.jpg?format=100w",
           name : "The Last Kingdom",
           desc : "loremIpsum",
           categ : "newbook",
           author : "Neelabh",
           price : "$50"
        },
        {
            url : "https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086517065-JFV2SSPHLME4IJOJELV0/ke17ZwdGBToddI8pDm48kA2JjvPQqgs_FlPzW0EzoXRZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7Xj1nVWs2aaTtWBneO2WM-syYtz4NJuBhWzqvkiK26pEe9uyqsvZqTzUTrwGWHls_w/hidden.jpg?format=100w",
            name : "Beyond the empire",
            desc : "loremIpsum",
            categ : "newbook",
            author : "Neelabh",
            price : "$50"
        },{
            url:"https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086544522-F9LYATLKQUDO998MFGQG/ke17ZwdGBToddI8pDm48kAlNLXdoQL9ctIBBubHiWv9Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwXAqEkstwczuD1Y-rJVx9yLFwSRUl8ilG6fqMOXFEr4_pNkamW8VSM8e8vZiPDq-A/Olivia.jpg?format=100w",            name : "behn",
            desc : "Beyond the empire",
            categ : "newbook",
            author : "Neelabh",
            price : "$50"
        },{
     
            url : "https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086526862-88SIOA1GC0SBX0VEJ403/ke17ZwdGBToddI8pDm48kEpNXecwgX92GlUhAS03JYpZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7Xj1nVWs2aaTtWBneO2WM-u6XhzMkcmz9zcH3altNmQJK_Kd_hD4icYv25EMIpq-ew/ninthburningcity.jpg?format=100w",
            name : "Beyond the empire",
            desc : "loremIpsum",
            categ : "newbook",
            author : "Neelabh",
            price : "$50"
        },
        {
            url :"https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086524653-KP2Q2VN2QN2G89R2C0G9/ke17ZwdGBToddI8pDm48kCVgUaD0TGE0Aj-L9EqDHm5Zw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGpJB3qB-HD69r8MikQv2J3QYGMmdD-Yf8wk6bGM76wXDShLtvKw_QBc0zW0_1GYeE/loveandlady.jpg?format=100w ",
           name : "Beyond the empire",
           desc : "loremIpsum",
           author : "Neelabh",
           categ : "g",
           price : "$50"
        },{
            url : "https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086516440-GC263MEVYEOILFXK50SH/ke17ZwdGBToddI8pDm48kFLE1N8Pfvjr8qBbh-uMKh5Zw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVFo_lC0XzfGziC13YBD0x2a0lX_gV6t_lJtHJl1e1kjPsggc8cnUtsAbA7XihgXXgg/herr.jpg",
            name : "Beyond the empire",
            desc : "loremIpsum",
            categ : "newbook",
            author : "Neelabh",
            price : "$50"
         },
         {
            url : "https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086516832-AZRG9UYN4O6D1470NGNC/ke17ZwdGBToddI8pDm48kE-HYFY2krjI0XqIJBx7a51Zw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGLRCrtnb2P0lT8WcfXyPrlGVIlNjLAKgiiz8OnM4ScqG-Lxw-ZpOXF4zlFz7N9Xa8/hetjind.jpg?format=100w",
            name : "The Last Kingdom",
            desc : "loremIpsum",
            categ : "newbook",
            author : "Neelabh",
            price : "$50"
         },
         {
             url : "https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086517065-JFV2SSPHLME4IJOJELV0/ke17ZwdGBToddI8pDm48kA2JjvPQqgs_FlPzW0EzoXRZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7Xj1nVWs2aaTtWBneO2WM-syYtz4NJuBhWzqvkiK26pEe9uyqsvZqTzUTrwGWHls_w/hidden.jpg?format=100w",
             name : "Beyond the empire",
             desc : "loremIpsum",
             categ : "newbook",
             author : "Neelabh",
             price : "$50"
         },{
            url : "https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086516440-GC263MEVYEOILFXK50SH/ke17ZwdGBToddI8pDm48kFLE1N8Pfvjr8qBbh-uMKh5Zw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVFo_lC0XzfGziC13YBD0x2a0lX_gV6t_lJtHJl1e1kjPsggc8cnUtsAbA7XihgXXgg/herr.jpg",
            name : "Beyond the empire",
            desc : "loremIpsum",
            categ : "newbook",
            author : "Neelabh",
            price : "$50"
         },
         {
            url : "https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086516832-AZRG9UYN4O6D1470NGNC/ke17ZwdGBToddI8pDm48kE-HYFY2krjI0XqIJBx7a51Zw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGLRCrtnb2P0lT8WcfXyPrlGVIlNjLAKgiiz8OnM4ScqG-Lxw-ZpOXF4zlFz7N9Xa8/hetjind.jpg?format=100w",
            name : "The Last Kingdom",
            desc : "loremIpsum",
            categ : "newbook",
            author : "Neelabh",
            price : "$50"
         },
         {
             url : "https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086517065-JFV2SSPHLME4IJOJELV0/ke17ZwdGBToddI8pDm48kA2JjvPQqgs_FlPzW0EzoXRZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7Xj1nVWs2aaTtWBneO2WM-syYtz4NJuBhWzqvkiK26pEe9uyqsvZqTzUTrwGWHls_w/hidden.jpg?format=100w",
             name : "Beyond the empire",
             desc : "loremIpsum",
             categ : "newbook",
             author : "Neelabh",
             price : "$50"
         },{
             url:"https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086544522-F9LYATLKQUDO998MFGQG/ke17ZwdGBToddI8pDm48kAlNLXdoQL9ctIBBubHiWv9Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwXAqEkstwczuD1Y-rJVx9yLFwSRUl8ilG6fqMOXFEr4_pNkamW8VSM8e8vZiPDq-A/Olivia.jpg?format=100w",            name : "behn",
             desc : "Beyond the empire",
             categ : "newbook",
             author : "Neelabh",
             price : "$50"
         },{
      
             url : "https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086526862-88SIOA1GC0SBX0VEJ403/ke17ZwdGBToddI8pDm48kEpNXecwgX92GlUhAS03JYpZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7Xj1nVWs2aaTtWBneO2WM-u6XhzMkcmz9zcH3altNmQJK_Kd_hD4icYv25EMIpq-ew/ninthburningcity.jpg?format=100w",
             name : "Beyond the empire",
             desc : "loremIpsum",
             categ : "newbook",
             author : "Neelabh",
             price : "$50"
         },
         {
             url :"https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086524653-KP2Q2VN2QN2G89R2C0G9/ke17ZwdGBToddI8pDm48kCVgUaD0TGE0Aj-L9EqDHm5Zw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGpJB3qB-HD69r8MikQv2J3QYGMmdD-Yf8wk6bGM76wXDShLtvKw_QBc0zW0_1GYeE/loveandlady.jpg?format=100w ",
            name : "Beyond the empire",
            desc : "loremIpsum",
            author : "Neelabh",
            categ : "g",
            price : "$50"
         },{
             url : "https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086516440-GC263MEVYEOILFXK50SH/ke17ZwdGBToddI8pDm48kFLE1N8Pfvjr8qBbh-uMKh5Zw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVFo_lC0XzfGziC13YBD0x2a0lX_gV6t_lJtHJl1e1kjPsggc8cnUtsAbA7XihgXXgg/herr.jpg",
             name : "Beyond the empire",
             desc : "loremIpsum",
             categ : "newbook",
             author : "Neelabh",
             price : "$50"
          },
          {
             url : "https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086516832-AZRG9UYN4O6D1470NGNC/ke17ZwdGBToddI8pDm48kE-HYFY2krjI0XqIJBx7a51Zw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGLRCrtnb2P0lT8WcfXyPrlGVIlNjLAKgiiz8OnM4ScqG-Lxw-ZpOXF4zlFz7N9Xa8/hetjind.jpg?format=100w",
             name : "The Last Kingdom",
             desc : "loremIpsum",
             categ : "newbook",
             author : "Neelabh",
             price : "$50"
          },
          {
              url : "https://images.squarespace-cdn.com/content/v1/5693c89ea976af0bfc5e01c3/1546086517065-JFV2SSPHLME4IJOJELV0/ke17ZwdGBToddI8pDm48kA2JjvPQqgs_FlPzW0EzoXRZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7Xj1nVWs2aaTtWBneO2WM-syYtz4NJuBhWzqvkiK26pEe9uyqsvZqTzUTrwGWHls_w/hidden.jpg?format=100w",
              name : "Beyond the empire",
              desc : "loremIpsum",
              categ : "newbook",
              author : "Neelabh",
              price : "$50"
          }],
    };
    render() {
        return (
            <div>
                <h1 style = {{marginTop : "100px", fontSize: "28px"}}>
                    Discover Your Next Book
                </h1>
                <div>
                    <ul classNAme = "tabsSection" style= {{display  : "block", margin: "30px 0 50px 0", padding : "0"}}>
                        <li style = {{minWidth: "200px", background : "#f1f1f1" ,cursor : "pointer",display : "inline-block",  listStyle : "none", padding : "10px"}}>
                            Latest Release
                        </li>
                        <li style = {{minWidth: "200px", background : "#f1f1f1" ,cursor : "pointer", display : "inline-block",listStyle : "none", padding : "10px", margin : "10px"}}>
                            Most Popuar
                        </li>
                        <li style = {{minWidth: "200px", background : "#f1f1f1" ,cursor : "pointer", display : "inline-block", listStyle : "none", padding : "10px", margin : "10px" }}>
                            Award winning
                        </li>
                    </ul>
                </div>
                <div>
                    {this.state.bookName.map((bookName,index) => <Booknew  bookName = {bookName} />)}
                   
                </div>
            </div>
        )
    }
}

export default Discoverbook
