window.addEventListener('DOMContentLoaded', _ => {
  const renderText = (cellData, rowData, index) => {
    const text = new Kuc.Text({
      value: cellData
    });

    return text;
  };

  function drag(ev, btn) {
    ev.dataTransfer.setData("move-index", btn.dataset.index);
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drop(ev, btn) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("move-index");
    const moveEvent = new CustomEvent('move-row', {
      detail: {
        from: data,
        to: btn.dataset.index
      }
    });
    document.dispatchEvent(moveEvent);
  }

  const renderMoveBtn = (cellData, rowData, index) => {
    const btn = document.createElement('button');
    btn.textContent = 'move';
    btn.dataset.index = index;
    btn.draggable = true;
    btn.ondragstart = (event) => {
      drag(event, btn);
    }
    btn.ondragover = (event) => {
      allowDrop(event);
    }
    btn.ondrop = (event) => {
      drop(event, btn);
    }

    return btn;
  };

  const columns = [
    {
      title: '#',
      field: 'move-index',
      render: renderMoveBtn
    },
    {
      title: 'Text input',
      field: 'text',
      render: renderText
    }
  ]

  const data = [
    { text: 'text 1' },
    { text: 'text 2' },
    { text: 'text 3' },
    { text: 'text 4' },
    { text: 'text 5' },
  ];

  const table = new Kuc.Table({
    columns,
    data
  });

  const handleCellChange = changedDetail => {
    if (changedDetail.field !== 'country') return;
    table.data[changedDetail.rowIndex].city = '';
  }

  table.addEventListener('change', event => {
    const changedDetail = event.detail;
    handleCellChange(changedDetail);
  });

  document.querySelector('#move-row-container').appendChild(table);
  document.addEventListener('move-row', event => {
    const tableData = JSON.parse(JSON.stringify(table.data));
    const temp = tableData[event.detail.to];
    tableData[event.detail.to] = tableData[event.detail.from];
    tableData[event.detail.from] = temp;
    table.data = tableData;
  })
});
