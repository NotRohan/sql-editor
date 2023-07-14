import { cn } from '@/lib/utils'
import { DataGrid, GridValidRowModel } from '@mui/x-data-grid'
import React from 'react'

interface TableProps {
    rows: GridValidRowModel[],
    columns: Column[],
    className: string | undefined
}

interface Column {
    field: string,
    headerName: string,
    width: number,
}

export default function Table({rows, columns, className}: TableProps) {
  return (
    <DataGrid
        style={{
          fontSize: '1rem',
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        className={cn(className)}
        columns={columns}
        rows={rows}
      />
  )
}