 Ext.define('App.model.test.BlogPost', {
    extend:'Ext.data.Model',
    fields:[
        'title',
        'body'
    ],
     belongsTo:[
        {
            name:'author',
            instanceName:'author',
            model:'App.model.test.Author',
            getterName:'getAuthor',
            setterName:'setAuthor',
            associationKey:'author'
        }
    ],
    hasMany:[
        {
            name:'comments',
            model:'App.model.test.Comment',
            associationKey:'comments'
        }
    ],
    proxy:{
        type:'ajax',
        // url:'https://dl.dropboxusercontent.com/u/1015920/Ext/blog-posts.json',
        url:'http://localhost/app/home/app/model/test/data.json',
        reader:{
            type:'json',
            root:'data'
        }
    }
});

// App.model.test.BlogPost.load(1, {
//     success:function(record, operation){
//         console.log(record.get('title'));
//         console.log(record.getAuthor().get('name'));
//         console.log(record.comments().getCount());
//     }
// });

