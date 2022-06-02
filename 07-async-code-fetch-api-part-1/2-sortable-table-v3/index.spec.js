import SortableTable from './index.js';

const headerConfig = [
  {
    id: 'images',
    title: 'Image',
    sortable: false,
    template: products => {
      return `
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="${products[0].url}">
        </div>
      `;
    }
  },
  {
    id: 'title',
    title: 'Name',
    sortable: true,
    sortType: 'string'
  },
  {
    id: 'quantity',
    title: 'Quantity',
    sortable: true,
    sortType: 'number'
  },
  {
    id: 'price',
    title: 'Price',
    sortable: true,
    sortType: 'number'
  },
  {
    id: 'status',
    title: 'Status',
    sortable: true,
    sortType: 'number',
    template: products => {
      return `<div class="sortable-table__cell">
        ${products > 0 ? 'Active' : 'Inactive'}
      </div>`;
    }
  },
];

describe('async-code-fetch-api-part-1/sortable-table-v3', () => {
  let sortableTable;

  beforeEach(() => {
    fetchMock.resetMocks();

    sortableTable = new SortableTable(headerConfig, {
      url: 'api/rest/products',
      sorted: {
        id: headerConfig.find(item => item.sortable).id,
        order: 'asc'
      }
    });

    document.body.append(sortableTable.element);
  });

  afterEach(() => {
    sortableTable.destroy();
    sortableTable = null;
  });

  it('should be rendered correctly', async() => {
    document.body.append(sortableTable.element);

    expect(sortableTable.element).toBeVisible();
    expect(sortableTable.element).toBeInTheDocument();
  });

  it('should call "loadData" method', () => {
    fetchMock.mockResponseOnce();

    expect(fetchMock.mock.calls.length).toEqual(1);
  });

  it('should have ability to be destroyed', () => {
    sortableTable.destroy();

    expect(sortableTable.element).not.toBeInTheDocument();
  });
});
