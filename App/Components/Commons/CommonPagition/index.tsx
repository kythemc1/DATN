import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PaginationProps {
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number, itemsPerPage: number) => void;
}

const CommonPagination= (props:PaginationProps) => {

  const handlePageChange = (page: number) => {
    props.onPageChange(page, props.itemsPerPage);
    console.log(page,'pageeeeeee');
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(
        <TouchableOpacity
          key={i}
          style={[styles.pageNumber, props.currentPage === i && styles.currentPage]}
          onPress={() => handlePageChange(i)}
        >
          <Text style={[styles.pageText, props.currentPage === i && styles.currentPageText]}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return pages;
  };

  return (
    <View style={styles.container}>
      {renderPageNumbers()}
      <TouchableOpacity
        style={styles.pageNumber}
        onPress={() => handlePageChange(props.currentPage + 1)}
        disabled={props.currentPage >= props.totalPages}
      >
        <Text style={styles.pageText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  pageNumber: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#1a1a1a', // Background color for page number buttons
  },
  currentPage: {
    backgroundColor: '#000', // Background color for current page button
  },
  pageText: {
    color: '#fff', // Text color for page number buttons
  },
  currentPageText: {
    color: '#1a73e8', // Text color for current page
  },
});

export default CommonPagination;
