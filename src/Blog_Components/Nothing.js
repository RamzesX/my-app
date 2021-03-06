import "./Nothing.css";
import ArticleLeft from "./ArticleLeft";
import ArticleRight from "./ArticleRight";
import React from 'react';
import ReactPaginate from 'react-paginate';


class PostDescription {
  constructor(title = "Tytuł Posta", author = "Autor Posta", data = "data",image="obrazek", description ="Opis Posta", id = "./post",empty =true ) {
    this.title = title;
    this.author = author;
    this.date = data;
    this.image = image;
    this.description = description;
    this.id = id;
    this.empty = empty;
  }
}

 var opisPosta = new PostDescription();

class Nothing extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = {
      page: 0,
      length: 0,
      posty: Array(4).fill(opisPosta)

    }
  }

  getLength() {
    fetch( "https://ghost.techautority.tech/ghost/api/v3/content/posts?key=f854db3727ebf596c066859b88&filter=tag:normal")
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              length: json.posts.length,
            });
          })
  }

  componentDidMount () {
    this.getLength();
    this.changeContent(0);
    //console.log("niestety, ale nadal ida request")
  }

  handlePageChange(pageNumber) {
    this.setState({
      page: pageNumber
    });
    this.changeContent(pageNumber);
  }

  changeContent(pageNumber) {
    fetch( "https://ghost.techautority.tech/ghost/api/v3/content/posts?key=f854db3727ebf596c066859b88&limit=4&filter=tag:normal&page=" + (pageNumber + 1).toString())
    .then((res) => res.json())
    .then((json) => {
      var posty2 = this.transformPost(json.posts);
      this.setState({
        posty: posty2
      })
    })
    document.getElementById("Nothing").scrollIntoView();
  }

  transformPost(postarray) {
    var tablica = Array(4);
    for (let i = 0; i < postarray.length; i++) {
      tablica[i] = new PostDescription(postarray[i].title, "Norbert Marchewka", postarray[i].published_at, postarray[i].feature_image,postarray[i].excerpt,postarray[i].id, false)
    }

    for (let i = 0; i < tablica.length; i++) {
      if (tablica[i] === undefined ) {
          tablica[i] = new PostDescription(); } 
    }
    return tablica; 
  }

  render() {
    return (
        <section id="Nothing">
                <h2 className="naglowek">Nothing Important</h2>
                <div id = "left">
                    {!this.state.posty[0].empty ? <ArticleRight post={this.state.posty[0]}/> : null}
                    {!this.state.posty[1].empty ? <ArticleLeft post={this.state.posty[1]}/> : null}
                    {!this.state.posty[2].empty ? <ArticleRight post={this.state.posty[2]}/> : null}
                    {!this.state.posty[3].empty ? <ArticleLeft post={this.state.posty[3]}/> : null}
                </div> 
                <PaginatedItems itemsPerPage={4} onPageChange={this.handlePageChange} pageCount2={this.state.length}/>
        </section>
    )
  }
}

function PaginatedItems({ itemsPerPage , onPageChange,pageCount2}) {

  const handlePageClick = (event) => {
    onPageChange(event.selected);
  };

  return (
    <>
      <ReactPaginate
        className="numerki"
        breakLabel="..."
        nextLabel="->"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={Math.ceil(pageCount2 / itemsPerPage)}
        previousLabel="<-"
        renderOnZeroPageCount={null}
      />
    </>
  );
}




export default Nothing;
