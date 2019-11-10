# -*- coding: utf-8 -*-
"""
Created on Tue Oct 22 10:22:01 2019

@author: flips
"""

import pandas
import csv
import json
import xlrd
import os 
import os.path
def split(word): 
    return list(word)

def get_block(word):
    result1 = []
    result3 = ""
    result1 = split(word)
    result3 = result1[0]
    return result3

def get_year(word):
    result1 = []
    result3 = ""
    result1 = split(word)
    result3 = result1[1]
    return result3
#matrixCell = {block first int, event string, outcome topic string, score, year second int}
#d = dict(), cell = {block, .. .. ..}
#matrixcell{cell1{block first int, event string, outcome topic string, score, year second int}}
#dictionary in dictionary (nested)

#This gets the .xlsx file and converts it into a 2D Array
#Change 'sampletest.xlsx' to our dataset to us that in the variable 'book'
def xlsxTocsv():
    path, dirs, files = next(os.walk('dataInput/'))
    for item in os.listdir('dataInput/'):
        if not item.startswith('.') and os.path.isfile(os.path.join('dataInput/', item)):
            print (item)
    print(len(files),files)
    list_files = files
    for fileN in range(len(list_files)):
        input_dir = 'dataInput/' + list_files[fileN]
        book = xlrd.open_workbook(input_dir)
        sheet = book.sheet_by_name('AllData')#'Sheet1' for sampletest, 'AllData' for analysis_498_first_page
        data = [[sheet.cell_value(r, c) for c in range(sheet.ncols)] for r in range(sheet.nrows)]
        outcomeTopic = data[0][:]

        blocklist = []
        yearlist = []
        counter1 = 1

        #gets the first and second numbers of the eventIDs and stores them into 
        #a block list and year list respectively
        for q in range((sheet.nrows)-1):
            block = get_block(data[counter1][0])
            blocklist.append(block)
            year = get_year(data[counter1][0])
            yearlist.append(year)
            counter1 += 1
            
        inner_dict = dict()
        rowsx = 1
        colsx = 1
        count = 0
        outer = []
        #nested dictionary where the outer dictionary contains cells of inner 
        #dictionaries with the labels and values for "block, year, Event, Outcome, and Score
        tempBlock =  int(blocklist[0])
        tempYear = int(yearlist[0])
          # here we can get the block and Year for First level of data structure
            # set the tempBlock and tempYear is to check same Block and Year 
            # Year, Block, eventlist(array) 
            #              eventlist: [ {Event1, Eventdetaillist}, {Event2, Eventdetail} ..........]
            #                                    Eventdetaillist: [{Outcome = "1", score = 0.xx}, Outcome = "2", score = 0.xx},.......]
            # so we will store one time when year and block change 
        eventlist = []
        for j in range((sheet.nrows)-1):
            EventName = data[rowsx][0]
            
            Eventdetaillist = []
            for i in range((sheet.ncols)-1):
                # for one row each column is same eventName
                inner_dict = {}
                # inner_dict['Block'] = int(blocklist[rowsx-1])
                # inner_dict['Year'] = int(yearlist[rowsx-1])
                # inner_dict['Event'] = data[rowsx][0]
                inner_dict['OutcomeTopic'] = outcomeTopic[colsx]
                inner_dict['Score'] = data[rowsx][colsx]  
                Eventdetaillist.append(inner_dict)
                colsx += 1
            eventdir = {'Event': EventName, 'Event_Outcome':Eventdetaillist}
            eventlist.append(eventdir)
            if rowsx+1 < sheet.nrows:
                tb = int(blocklist[rowsx]) 
                ty = int(yearlist[rowsx])
                if (tempBlock != tb  or tempYear != ty): # check next row  
                    finaldir = {}
                    finaldir = {'Year': tempYear, 'Block': tempBlock,'Eventlist':eventlist}
                    with open('dataOutput/' + 'run'+ str(fileN)+'.json', 'a') as json_file:
                        json.dump(finaldir, json_file)
                        json_file.write("\n")
                    eventlist = []
                    tempBlock = int(blocklist[rowsx])
                    tempYear =  int(yearlist[rowsx])
            if(rowsx == sheet.nrows-1):
                finaldir = {}
                finaldir = {'Year': tempYear, 'Block': tempBlock,'Eventlist':eventlist}
                with open('dataOutput/' + 'run'+ str(fileN)+'.json', 'a') as json_file:
                    json.dump(finaldir, json_file)
                    json_file.write("\n")

            rowsx += 1
            colsx =  1
    
#for k in range(((sheet.nrows)-1)
    
#with open('parsedData.json', 'w') as json_file:
 #   json.dump(outer, json_file)
  #  json_file.write("\n")
xlsxTocsv()
path, dirs, files = next(os.walk('dataOutput/'))
for item in os.listdir('dataOutput/'):
    if not item.startswith('.') and os.path.isfile(os.path.join('dataOutput/', item)):
        print (item)